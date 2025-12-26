import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

export function useWeather(city: string | null) {
  return useQuery({
    // Only fetch if a city is provided
    queryKey: [api.weather.get.path, city],
    enabled: !!city && city.length > 0,
    queryFn: async () => {
      if (!city) throw new Error("City required");
      
      const url = buildUrl(api.weather.get.path, { city });
      const res = await fetch(url);
      
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error("City not found");
        }
        throw new Error("Failed to fetch weather data");
      }
      
      return api.weather.get.responses[200].parse(await res.json());
    },
    retry: false, // Don't retry on 404s
  });
}
