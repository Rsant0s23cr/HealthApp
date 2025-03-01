import { User, InsertUser, FoodEntry, InsertFoodEntry } from "@shared/schema";

export interface IStorage {
  // User operations
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<User>): Promise<User>;
  getUser(id: number): Promise<User | undefined>;
  
  // Food entry operations
  createFoodEntry(entry: InsertFoodEntry): Promise<FoodEntry>;
  getFoodEntriesForUser(userId: number): Promise<FoodEntry[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private foodEntries: Map<number, FoodEntry>;
  private userId: number = 1;
  private entryId: number = 1;

  constructor() {
    this.users = new Map();
    this.foodEntries = new Map();
  }

  async createUser(userData: InsertUser): Promise<User> {
    const user: User = { id: this.userId++, ...userData };
    this.users.set(user.id, user);
    return user;
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    const user = await this.getUser(id);
    if (!user) throw new Error("User not found");
    
    const updatedUser = { ...user, ...userData };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async createFoodEntry(entryData: InsertFoodEntry): Promise<FoodEntry> {
    const entry: FoodEntry = { 
      id: this.entryId++,
      timestamp: new Date(),
      ...entryData 
    };
    this.foodEntries.set(entry.id, entry);
    return entry;
  }

  async getFoodEntriesForUser(userId: number): Promise<FoodEntry[]> {
    return Array.from(this.foodEntries.values())
      .filter(entry => entry.userId === userId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }
}

export const storage = new MemStorage();
