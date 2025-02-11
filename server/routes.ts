import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";

export function registerRoutes(app: Express): Server {
  // Set up authentication routes
  setupAuth(app);

  // Get children for parent
  app.get("/api/children", async (req, res) => {
    // Since we're bypassing auth, always return children for parent ID 1
    const children = await storage.getChildrenForParent(1);
    res.json(children);
  });

  // Get achievements for user
  app.get("/api/achievements", async (req, res) => {
    const achievements = await storage.getAchievementsForUser(req.user?.id || 1);
    res.json(achievements);
  });

  // Get progress for user
  app.get("/api/progress", async (req, res) => {
    const progress = await storage.getProgressForUser(req.user?.id || 1);
    res.json(progress);
  });

  const httpServer = createServer(app);
  return httpServer;
}