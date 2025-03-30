import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Timeline schema
export const timelines = pgTable("timelines", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  title: text("title").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  personalInfo: json("personal_info").notNull(),
  goals: json("goals").notNull(),
  habits: json("habits").notNull(),
  prediction: json("prediction").notNull(),
});

export const insertTimelineSchema = createInsertSchema(timelines).pick({
  userId: true,
  title: true,
  personalInfo: true,
  goals: true,
  habits: true,
  prediction: true,
});

// Career schema
export const careers = pgTable("careers", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  title: text("title").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  dreamJob: json("dream_job").notNull(),
  currentProfile: json("current_profile").notNull(),
  preferences: json("preferences").notNull(),
  roadmap: json("roadmap").notNull(),
});

export const insertCareerSchema = createInsertSchema(careers).pick({
  userId: true,
  title: true,
  dreamJob: true,
  currentProfile: true,
  preferences: true,
  roadmap: true,
});

// Define the input schemas for the API
export const timelineInputSchema = z.object({
  title: z.string().min(1, "Title is required"),
  personalInfo: z.object({
    age: z.string().min(1, "Age is required"),
    education: z.string().min(1, "Education level is required"),
    currentField: z.string().min(1, "Current field is required"),
  }),
  goals: z.object({
    careerGoals: z.string().min(1, "Career goals are required"),
    financialGoals: z.string().min(1, "Financial goals are required"),
    personalGoals: z.string().min(1, "Personal goals are required"),
  }),
  habits: z.object({
    learningHabits: z.string().min(1, "Learning habits are required"),
    healthHabits: z.string().min(1, "Health habits are required"),
    financialHabits: z.string().min(1, "Financial habits are required"),
  }),
});

export const careerInputSchema = z.object({
  title: z.string().min(1, "Title is required"),
  dreamJob: z.object({
    jobTitle: z.string().min(1, "Dream job title is required"),
    industry: z.string().min(1, "Industry is required"),
    appeal: z.string().min(1, "Job appeal is required"),
  }),
  currentProfile: z.object({
    currentJob: z.string().min(1, "Current job is required"),
    topSkills: z.string().min(1, "Top skills are required"),
    yearsExperience: z.string().min(1, "Years of experience is required"),
  }),
  preferences: z.object({
    timeline: z.string().min(1, "Timeline is required"),
    learningPreference: z.string().min(1, "Learning preference is required"),
  }),
});

// Export types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertTimeline = z.infer<typeof insertTimelineSchema>;
export type Timeline = typeof timelines.$inferSelect;

export type InsertCareer = z.infer<typeof insertCareerSchema>;
export type Career = typeof careers.$inferSelect;

export type TimelineInput = z.infer<typeof timelineInputSchema>;
export type CareerInput = z.infer<typeof careerInputSchema>;
