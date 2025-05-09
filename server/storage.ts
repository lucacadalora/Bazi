import { baziReadings, type BaziReading, type InsertBaziReading, users, type User, type UpsertUser } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User operations for Replit Auth
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // BaZi Reading operations
  createBaziReading(reading: InsertBaziReading, userId?: string): Promise<BaziReading>;
  getBaziReading(id: number): Promise<BaziReading | undefined>;
  updateBaziReading(id: number, analysis: any): Promise<BaziReading>;
  getBaziReadingsByUserId(userId: string): Promise<BaziReading[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // BaZi Reading operations
  async createBaziReading(reading: InsertBaziReading, userId?: string): Promise<BaziReading> {
    const [newReading] = await db
      .insert(baziReadings)
      .values({
        ...reading,
        userId: userId || null,
        reading: null,
      })
      .returning();
    
    return newReading;
  }

  async getBaziReading(id: number): Promise<BaziReading | undefined> {
    const [reading] = await db
      .select()
      .from(baziReadings)
      .where(eq(baziReadings.id, id));
    
    return reading;
  }

  async updateBaziReading(id: number, analysis: any): Promise<BaziReading> {
    const [updatedReading] = await db
      .update(baziReadings)
      .set({ reading: analysis })
      .where(eq(baziReadings.id, id))
      .returning();
    
    if (!updatedReading) {
      throw new Error(`Reading with ID ${id} not found`);
    }
    
    return updatedReading;
  }

  async getBaziReadingsByUserId(userId: string): Promise<BaziReading[]> {
    return await db
      .select()
      .from(baziReadings)
      .where(eq(baziReadings.userId, userId));
  }
}

export const storage = new DatabaseStorage();
