import { IStorage } from "./types";
import { User, Achievement, Progress, InsertUser } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private achievements: Map<number, Achievement>;
  private progress: Map<number, Progress>;
  public sessionStore: session.Store;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.achievements = new Map();
    this.progress = new Map();
    this.currentId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getChildrenForParent(parentId: number): Promise<User[]> {
    return Array.from(this.users.values()).filter(
      (user) => user.parentId === parentId,
    );
  }

  async getAchievementsForUser(userId: number): Promise<Achievement[]> {
    return Array.from(this.achievements.values()).filter(
      (achievement) => achievement.userId === userId,
    );
  }

  async getProgressForUser(userId: number): Promise<Progress[]> {
    return Array.from(this.progress.values()).filter(
      (progress) => progress.userId === userId,
    );
  }
}

export const storage = new MemStorage();
