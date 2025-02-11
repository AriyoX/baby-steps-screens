import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isParent: boolean("is_parent").notNull().default(false),
  parentId: integer("parent_id").references(() => users.id),
  displayName: text("display_name"),
  avatarUrl: text("avatar_url")
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

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  isParent: true,
  parentId: true,
  displayName: true,
  avatarUrl: true
});

export const insertAchievementSchema = createInsertSchema(achievements);
export const insertProgressSchema = createInsertSchema(progress);

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Achievement = typeof achievements.$inferSelect;
export type Progress = typeof progress.$inferSelect;
