import { 
  User, InsertUser, 
  Timeline, InsertTimeline, 
  Career, InsertCareer 
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Timeline methods
  createTimeline(timeline: InsertTimeline): Promise<Timeline>;
  getTimeline(id: number): Promise<Timeline | undefined>;
  getTimelinesByUserId(userId: number | null): Promise<Timeline[]>;
  deleteTimeline(id: number): Promise<boolean>;
  
  // Career methods
  createCareer(career: InsertCareer): Promise<Career>;
  getCareer(id: number): Promise<Career | undefined>;
  getCareersByUserId(userId: number | null): Promise<Career[]>;
  deleteCareer(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private timelines: Map<number, Timeline>;
  private careers: Map<number, Career>;
  private userCurrentId: number;
  private timelineCurrentId: number;
  private careerCurrentId: number;

  constructor() {
    this.users = new Map();
    this.timelines = new Map();
    this.careers = new Map();
    this.userCurrentId = 1;
    this.timelineCurrentId = 1;
    this.careerCurrentId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Timeline methods
  async createTimeline(insertTimeline: InsertTimeline): Promise<Timeline> {
    const id = this.timelineCurrentId++;
    const createdAt = new Date();
    const timeline: Timeline = { 
      id, 
      createdAt,
      userId: insertTimeline.userId || null,
      title: insertTimeline.title,
      personalInfo: insertTimeline.personalInfo,
      goals: insertTimeline.goals,
      habits: insertTimeline.habits,
      prediction: insertTimeline.prediction
    };
    this.timelines.set(id, timeline);
    return timeline;
  }

  async getTimeline(id: number): Promise<Timeline | undefined> {
    return this.timelines.get(id);
  }

  async getTimelinesByUserId(userId: number | null): Promise<Timeline[]> {
    return Array.from(this.timelines.values())
      .filter(timeline => timeline.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async deleteTimeline(id: number): Promise<boolean> {
    return this.timelines.delete(id);
  }

  // Career methods
  async createCareer(insertCareer: InsertCareer): Promise<Career> {
    const id = this.careerCurrentId++;
    const createdAt = new Date();
    const career: Career = { 
      id, 
      createdAt,
      userId: insertCareer.userId || null,
      title: insertCareer.title,
      dreamJob: insertCareer.dreamJob,
      currentProfile: insertCareer.currentProfile,
      preferences: insertCareer.preferences,
      roadmap: insertCareer.roadmap
    };
    this.careers.set(id, career);
    return career;
  }

  async getCareer(id: number): Promise<Career | undefined> {
    return this.careers.get(id);
  }

  async getCareersByUserId(userId: number | null): Promise<Career[]> {
    return Array.from(this.careers.values())
      .filter(career => career.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async deleteCareer(id: number): Promise<boolean> {
    return this.careers.delete(id);
  }
}

export const storage = new MemStorage();
