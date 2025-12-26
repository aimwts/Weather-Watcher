import { pgTable, text, serial, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const searches = pgTable("searches", {
  id: serial("id").primaryKey(),
  city: text("city").notNull(),
  searchedAt: timestamp("searched_at").defaultNow(),
});

export const insertSearchSchema = createInsertSchema(searches).omit({ id: true, searchedAt: true });

export type InsertSearch = z.infer<typeof insertSearchSchema>;
export type Search = typeof searches.$inferSelect;

// Weather Data Schema (Response type)
export const weatherSchema = z.object({
  city: z.string(),
  temperature: z.number(),
  humidity: z.number(),
  windSpeed: z.number(),
  condition: z.enum(["Sunny", "Cloudy", "Rainy", "Snowy"]),
});

export type WeatherData = z.infer<typeof weatherSchema>;
