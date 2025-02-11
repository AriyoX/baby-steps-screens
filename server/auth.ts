import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import { storage } from "./storage";
import { User as SelectUser, insertUserSchema } from "@shared/schema";

declare global {
  namespace Express {
    interface User extends SelectUser {}
  }
}

export function setupAuth(app: Express) {
  const sessionSettings: session.SessionOptions = {
    secret: process.env.REPL_ID!,
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore,
  };

  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  // Auto-authenticate any login attempt
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      // Create a mock user if it doesn't exist
      let user = await storage.getUserByUsername(username);
      if (!user) {
        user = await storage.createUser({
          username,
          password: "mock",
          isParent: true,
          displayName: username,
        });
      }
      return done(null, user);
    }),
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id: number, done) => {
    const user = await storage.getUser(id);
    done(null, user);
  });

  // Auto-success login
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.status(200).json(req.user);
  });

  // Auto-success register
  app.post("/api/register", async (req, res, next) => {
    try {
      const parseResult = insertUserSchema.safeParse(req.body);
      if (!parseResult.success) {
        return res.status(400).json({ message: "Invalid input" });
      }

      const user = await storage.createUser({
        ...req.body,
        password: "mock",
      });

      req.login(user, (err) => {
        if (err) return next(err);
        res.status(201).json(user);
      });
    } catch (err) {
      next(err);
    }
  });

  app.post("/api/logout", (req, res) => {
    res.sendStatus(200);
  });

  // Always return a mock user
  app.get("/api/user", (req, res) => {
    res.json({
      id: 1,
      username: "demo",
      displayName: "Demo User",
      isParent: true,
      password: "mock",
    });
  });
}