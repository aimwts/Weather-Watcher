import { searches, type Search, type InsertSearch, type WeatherData } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  insertSearch(search: InsertSearch): Promise<Search>;
  getWeather(city: string): Promise<WeatherData>;
}

export class DatabaseStorage implements IStorage {
  async insertSearch(insertSearch: InsertSearch): Promise<Search> {
    const [search] = await db.insert(searches).values(insertSearch).returning();
    return search;
  }

  async getWeather(city: string): Promise<WeatherData> {
    // Mock weather data generation
    // Simple mock logic: consistent-ish results could be better but random is fine for a demo
    const conditions = ["Sunny", "Cloudy", "Rainy", "Snowy"] as const;
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    const temperature = Math.floor(Math.random() * 40) - 5; // -5 to 35
    const humidity = Math.floor(Math.random() * 70) + 20; // 20 to 90
    const windSpeed = Math.floor(Math.random() * 30) + 5; // 5 to 35

    return {
      city,
      temperature,
      humidity,
      windSpeed,
      condition,
    };
  }
}

export const storage = new DatabaseStorage();
