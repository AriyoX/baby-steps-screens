import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";

export function registerRoutes(app: Express): Server {
  // Set up authentication routes
  setupAuth(app);

  // Get children for parent
  app.get("/api/children", async (req, res) => {
    if (!req.isAuthenticated() || !req.user.isParent) {
      return res.sendStatus(401);
    }
    const children = await storage.getChildrenForParent(req.user.id);
    res.json(children);
  });

  // Get achievements for user
  app.get("/api/achievements", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }
    const achievements = await storage.getAchievementsForUser(req.user.id);
    res.json(achievements);
  });

  // Get progress for user
  app.get("/api/progress", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }
    const progress = await storage.getProgressForUser(req.user.id);
    res.json(progress);
  });

  const httpServer = createServer(app);
  return httpServer;
}
