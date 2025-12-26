import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get(api.weather.get.path, async (req, res) => {
    try {
      const city = req.params.city;
      // Mock delay for realism/loading state showcase
      await new Promise(resolve => setTimeout(resolve, 800));

      const weather = await storage.getWeather(city);
      await storage.insertSearch({ city });

      res.json(weather);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch weather data" });
    }
  });

  return httpServer;
}
