import { baziReadings, type BaziReading, type InsertBaziReading, users, type User, type InsertUser } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createBaziReading(reading: InsertBaziReading): Promise<BaziReading>;
  getBaziReading(id: number): Promise<BaziReading | undefined>;
  updateBaziReading(id: number, analysis: any): Promise<BaziReading>;
  getBaziReadingsByUserId(userId: number): Promise<BaziReading[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private readings: Map<number, BaziReading>;
  currentUserId: number;
  currentReadingId: number;

  constructor() {
    this.users = new Map();
    this.readings = new Map();
    this.currentUserId = 1;
    this.currentReadingId = 1;
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
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createBaziReading(reading: InsertBaziReading): Promise<BaziReading> {
    const id = this.currentReadingId++;
    const now = new Date();
    
    const newReading: BaziReading = {
      ...reading,
      id,
      userId: null,
      reading: null,
      createdAt: now,
    };
    
    this.readings.set(id, newReading);
    return newReading;
  }

  async getBaziReading(id: number): Promise<BaziReading | undefined> {
    return this.readings.get(id);
  }

  async updateBaziReading(id: number, analysis: any): Promise<BaziReading> {
    const reading = this.readings.get(id);
    
    if (!reading) {
      throw new Error(`Reading with ID ${id} not found`);
    }
    
    const updatedReading: BaziReading = {
      ...reading,
      reading: analysis,
    };
    
    this.readings.set(id, updatedReading);
    return updatedReading;
  }

  async getBaziReadingsByUserId(userId: number): Promise<BaziReading[]> {
    return Array.from(this.readings.values()).filter(
      (reading) => reading.userId === userId,
    );
  }
}

export const storage = new MemStorage();
