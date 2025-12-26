import { useState } from "react";
import { useWeather } from "@/hooks/use-weather";
import { WeatherIcon } from "@/components/ui/weather-icon";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Wind, Droplets, MapPin, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [city, setCity] = useState<string | null>(null);
  const { toast } = useToast();

  const { data: weather, isLoading, error, isError } = useWeather(city);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    setCity(searchInput.trim());
  };

  // Show toast on error
  if (isError && error) {
    // Only show toast if it's a new error (React strict mode might fire twice)
    // In a real app we'd use useEffect for side effects, but for simplicity:
    console.error(error); 
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8">
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md space-y-8 z-10"
      >
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-blue-200 tracking-tight text-glow">
            Atmosphere
          </h1>
          <p className="text-blue-200/60 font-medium">Global Weather Intelligence</p>
        </div>

        <Card className="glass-card border-0 overflow-hidden">
          <CardContent className="p-6">
            <form onSubmit={handleSearch} className="relative flex items-center">
              <Search className="absolute left-3 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search city..."
                className="pl-10 h-12 bg-black/20 border-white/10 text-white placeholder:text-white/30 rounded-xl focus-visible:ring-blue-500/50 focus-visible:border-blue-500/50 transition-all"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <Button 
                type="submit" 
                size="icon"
                disabled={isLoading || !searchInput.trim()}
                className="absolute right-1 w-10 h-10 rounded-lg bg-blue-600/80 hover:bg-blue-500 text-white transition-colors"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              </Button>
            </form>
          </CardContent>
        </Card>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full"
            >
              <Card className="glass-card border-0 h-[300px] flex items-center justify-center">
                 <div className="flex flex-col items-center gap-4 text-blue-200/50">
                    <Loader2 className="w-10 h-10 animate-spin" />
                    <p className="font-medium animate-pulse">Scanning atmosphere...</p>
                 </div>
              </Card>
            </motion.div>
          ) : isError ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card className="glass-card border-red-500/20 bg-red-950/10">
                <CardContent className="p-8 text-center space-y-2">
                  <div className="mx-auto w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                    <MapPin className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="text-xl font-bold text-red-200">City Not Found</h3>
                  <p className="text-red-200/60">Could not locate "{city}". Please try another search.</p>
                </CardContent>
              </Card>
            </motion.div>
          ) : weather ? (
            <motion.div
              key="weather"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="glass-card border-0 overflow-hidden">
                <div className="absolute top-0 right-0 p-32 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 p-32 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
                
                <CardHeader className="relative pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-3xl font-display font-bold text-white flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-blue-400" />
                        {weather.city}
                      </CardTitle>
                      <p className="text-blue-200/60 font-medium mt-1">Current Conditions</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-blue-200/60 uppercase tracking-wider">{new Date().toLocaleDateString('en-US', { weekday: 'long' })}</p>
                      <p className="text-xs text-blue-200/40">{new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="relative space-y-8 pt-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="text-7xl font-display font-bold text-white tracking-tighter">
                        {Math.round(weather.temperature)}°
                      </div>
                      <p className="text-xl text-blue-200 font-medium">{weather.condition}</p>
                    </div>
                    <div className="p-4 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-inner">
                      <WeatherIcon condition={weather.condition} className="w-20 h-20" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm flex items-center gap-4 hover:bg-white/10 transition-colors group">
                      <div className="p-3 rounded-xl bg-blue-500/20 text-blue-300 group-hover:scale-110 transition-transform">
                        <Droplets className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm text-blue-200/50 font-medium">Humidity</p>
                        <p className="text-xl font-bold text-white">{weather.humidity}%</p>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm flex items-center gap-4 hover:bg-white/10 transition-colors group">
                      <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-300 group-hover:scale-110 transition-transform">
                        <Wind className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm text-blue-200/50 font-medium">Wind</p>
                        <p className="text-xl font-bold text-white">{weather.windSpeed} km/h</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.2 }}
               className="text-center text-blue-200/30 text-sm mt-8"
            >
              Enter a city name to explore current weather conditions
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
