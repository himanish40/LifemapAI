import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateLifeTimeline, generateCareerRoadmap } from "./googleai";
import { timelineInputSchema, careerInputSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for Timeline
  app.post("/api/timeline", async (req: Request, res: Response) => {
    try {
      const result = timelineInputSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ message: validationError.message });
      }
      
      const { personalInfo, goals, habits } = result.data;
      
      // Call Google AI to generate prediction
      const prediction = await generateLifeTimeline(personalInfo, goals, habits);
      
      // For simplicity, we're not implementing user authentication in this MVP
      // so we'll use null for userId
      const timeline = await storage.createTimeline({
        userId: null,
        title: result.data.title,
        personalInfo,
        goals,
        habits,
        prediction,
      });
      
      return res.status(201).json(timeline);
    } catch (error) {
      console.error("Error creating timeline:", error);
      
      // Check if this might be an API key issue
      if (!process.env.GOOGLE_API_KEY) {
        return res.status(500).json({ 
          message: "Google API key is missing. Please configure the GOOGLE_API_KEY environment variable.",
          missingApiKey: true
        });
      }
      
      return res.status(500).json({ message: "Failed to create timeline" });
    }
  });
  
  app.get("/api/timeline/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid timeline ID" });
      }
      
      const timeline = await storage.getTimeline(id);
      
      if (!timeline) {
        return res.status(404).json({ message: "Timeline not found" });
      }
      
      return res.status(200).json(timeline);
    } catch (error) {
      console.error("Error getting timeline:", error);
      return res.status(500).json({ message: "Failed to get timeline" });
    }
  });
  
  app.get("/api/timelines", async (req: Request, res: Response) => {
    try {
      // For simplicity, we're showing all timelines
      // In a real app, we would filter by authenticated user
      const userId = null;
      const timelines = await storage.getTimelinesByUserId(userId);
      
      return res.status(200).json(timelines);
    } catch (error) {
      console.error("Error getting timelines:", error);
      return res.status(500).json({ message: "Failed to get timelines" });
    }
  });
  
  app.delete("/api/timeline/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid timeline ID" });
      }
      
      const success = await storage.deleteTimeline(id);
      
      if (!success) {
        return res.status(404).json({ message: "Timeline not found" });
      }
      
      return res.status(200).json({ message: "Timeline deleted successfully" });
    } catch (error) {
      console.error("Error deleting timeline:", error);
      return res.status(500).json({ message: "Failed to delete timeline" });
    }
  });
  
  // API routes for Career
  app.post("/api/career", async (req: Request, res: Response) => {
    try {
      const result = careerInputSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ message: validationError.message });
      }
      
      const { dreamJob, currentProfile, preferences } = result.data;
      
      // Call Google AI to generate roadmap
      const roadmap = await generateCareerRoadmap(dreamJob, currentProfile, preferences);
      
      // For simplicity, we're not implementing user authentication in this MVP
      // so we'll use null for userId
      const career = await storage.createCareer({
        userId: null,
        title: result.data.title,
        dreamJob,
        currentProfile,
        preferences,
        roadmap,
      });
      
      return res.status(201).json(career);
    } catch (error) {
      console.error("Error creating career roadmap:", error);
      
      // Check if this might be an API key issue
      if (!process.env.GOOGLE_API_KEY) {
        return res.status(500).json({ 
          message: "Google API key is missing. Please configure the GOOGLE_API_KEY environment variable.",
          missingApiKey: true
        });
      }
      
      return res.status(500).json({ message: "Failed to create career roadmap" });
    }
  });
  
  app.get("/api/career/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid career ID" });
      }
      
      const career = await storage.getCareer(id);
      
      if (!career) {
        return res.status(404).json({ message: "Career roadmap not found" });
      }
      
      return res.status(200).json(career);
    } catch (error) {
      console.error("Error getting career roadmap:", error);
      return res.status(500).json({ message: "Failed to get career roadmap" });
    }
  });
  
  app.get("/api/careers", async (req: Request, res: Response) => {
    try {
      // For simplicity, we're showing all careers
      // In a real app, we would filter by authenticated user
      const userId = null;
      const careers = await storage.getCareersByUserId(userId);
      
      return res.status(200).json(careers);
    } catch (error) {
      console.error("Error getting career roadmaps:", error);
      return res.status(500).json({ message: "Failed to get career roadmaps" });
    }
  });
  
  app.delete("/api/career/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid career ID" });
      }
      
      const success = await storage.deleteCareer(id);
      
      if (!success) {
        return res.status(404).json({ message: "Career roadmap not found" });
      }
      
      return res.status(200).json({ message: "Career roadmap deleted successfully" });
    } catch (error) {
      console.error("Error deleting career roadmap:", error);
      return res.status(500).json({ message: "Failed to delete career roadmap" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
