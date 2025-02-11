import session from "express-session";
import { User, Achievement, Progress, InsertUser } from "@shared/schema";

export interface IStorage {
  sessionStore: session.Store;
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getChildrenForParent(parentId: number): Promise<User[]>;
  getAchievementsForUser(userId: number): Promise<Achievement[]>;
  getProgressForUser(userId: number): Promise<Progress[]>;
}
