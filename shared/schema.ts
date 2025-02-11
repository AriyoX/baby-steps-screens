import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import type { AnyPgColumn } from "drizzle-orm/pg-core";

// Define type first to avoid recursive reference
type UserForeignKeyConfig = {
  columns: AnyPgColumn[];
  references: () => { columns: AnyPgColumn[] };
};

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isParent: boolean("is_parent").notNull().default(false),
  parentId: integer("parent_id"),
  displayName: text("display_name").notNull(),
  avatarUrl: text("avatar_url"),
  // Onboarding fields
  age: integer("age"),
  interests: text("interests").array(),
  learningStyle: text("learning_style"),
  favoriteTopic: text("favorite_topic"),
  dailyGoalMinutes: integer("daily_goal_minutes").default(30),
});

export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  type: text("type").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  earnedAt: text("earned_at").notNull()
});

export const progress = pgTable("progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  moduleId: text("module_id").notNull(),
  score: integer("score").notNull(),
  completedAt: text("completed_at").notNull()
});

// Create Zod schemas with validation
export const insertUserSchema = createInsertSchema(users, {
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  displayName: z.string().min(1, "Display name is required"),
  age: z.number().min(4).max(12).optional(),
  interests: z.array(z.string()).optional(),
  learningStyle: z.enum(["visual", "auditory", "kinesthetic"]).optional(),
  favoriteTopic: z.string().optional(),
  dailyGoalMinutes: z.number().min(15).max(120).optional(),
});

export const insertAchievementSchema = createInsertSchema(achievements);
export const insertProgressSchema = createInsertSchema(progress);

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Achievement = typeof achievements.$inferSelect;
export type Progress = typeof progress.$inferSelect;