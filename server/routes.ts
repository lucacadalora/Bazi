import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import OpenAI from "openai";
import { baziReadingSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { setupAuth, isAuthenticated } from "./replitAuth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up Replit Auth
  await setupAuth(app);

  // Initialize OpenAI client
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "",
  });
  
  // API route for BaZi analysis
  app.post("/api/bazi-analysis", async (req, res) => {
    try {
      // Validate the request body
      const validatedData = baziReadingSchema.parse(req.body);
      
      // Save the reading data
      const baziReading = await storage.createBaziReading(validatedData);
      
      // Generate the system prompt for BaZi analysis
      const systemPrompt = `
        You are a master of BaZi (Chinese Four Pillars of Destiny) astrology. 
        Analyze the following birth information and provide a detailed BaZi reading.
        
        Return your response as a JSON object with the following structure:
        {
          "chart": {
            "name": "Full name",
            "birthInfo": "Birth date, time and location summary",
            "yearPillar": { "symbol": "Chinese character", "name": "Element and animal" },
            "monthPillar": { "symbol": "Chinese character", "name": "Element and animal" },
            "dayPillar": { "symbol": "Chinese character", "name": "Element and animal" },
            "hourPillar": { "symbol": "Chinese character", "name": "Element and animal" },
            "masterElement": "Primary element",
            "tags": ["Element characteristics", "Personality traits"]
          },
          "personality": ["Trait 1", "Trait 2", "Trait 3", "Trait 4", "Trait 5"],
          "career": {
            "description": "Career analysis",
            "paths": ["Career 1", "Career 2", "Career 3", "Career 4", "Career 5"]
          },
          "relationships": {
            "description": "Relationship style description",
            "compatibilities": [
              { "type": "Element type", "level": "Very High/High/Medium/Low", "percentage": 90 },
              { "type": "Element type", "level": "Very High/High/Medium/Low", "percentage": 60 }
            ]
          },
          "forecast": [
            { "period": "Q1: January-March", "description": "Forecast for this period" },
            { "period": "Q2: April-June", "description": "Forecast for this period" },
            { "period": "Q3: July-September", "description": "Forecast for this period" },
            { "period": "Q4: October-December", "description": "Forecast for this period" }
          ],
          "elements": {
            "wood": 35,
            "fire": 25,
            "earth": 20,
            "metal": 10,
            "water": 10,
            "details": [
              {
                "element": "Wood",
                "strengths": ["Strength 1", "Strength 2", "Strength 3"],
                "weaknesses": ["Weakness 1", "Weakness 2"],
                "expressions": ["Expression 1", "Expression 2", "Expression 3"]
              },
              // Repeat for each element: Fire, Earth, Metal, Water
            ],
            "interactions": [
              { "type": "Supportive", "description": "Water nourishes your Wood" },
              { "type": "Challenging", "description": "Metal tends to cut your Wood" },
              { "type": "Balancing need", "description": "More Water element to support growth" }
            ]
          },
          "favorable": {
            "elements": [
              { "element": "Water", "description": "Enhances your creativity and wisdom" },
              { "element": "Metal", "description": "Brings clarity and precision to your actions" }
            ],
            "directions": ["North", "East", "Northeast"],
            "colors": ["Blue", "Black", "Teal", "Silver"]
          },
          "recommendations": {
            "periods": [
              { 
                "timeframe": "February 14 - March 2", 
                "description": "Excellent period for career advancement and new projects.", 
                "type": "Career Growth" 
              },
              // Add more periods
            ],
            "practices": [
              { 
                "name": "Forest Bathing", 
                "element": "Wood", 
                "description": "Spending time among trees will enhance your dominant Wood element, reducing stress and improving creativity." 
              },
              // Add more practices
            ],
            "avoidances": [
              { 
                "name": "Excessive Competition", 
                "element": "Fire", 
                "description": "Highly competitive environments may over-stimulate your Fire element, leading to burnout and impulsive decisions." 
              },
              // Add more avoidances
            ],
            "environment": {
              "home": ["East-facing workspace to enhance Wood energy", "Blue and black accents in relaxation areas", "Indoor plants to balance your environment", "Minimize red colors in bedroom spaces"],
              "diet": ["Include more black foods (black beans, seaweed)", "Moderate spicy foods that increase Fire", "Add white foods (rice, white fish) for Metal", "Green vegetables to support your Wood"],
              "routine": ["Early morning routine to enhance Wood", "Midday breaks outdoors to balance Fire", "Evening water intake for better equilibrium", "Weekly earth activities for grounding"]
            },
            "fengShui": [
              "Position your desk facing East or North to align with your favorable directions",
              "Your wealth corner (Southeast) should be kept clean and well-lit",
              "Place water features in the North area of your home to enhance career prospects",
              "Add metal decorative items in the West to support structure and clarity",
              "Include a small water fountain in your work area to balance your strong Wood",
              "Earth tones in the Southwest will strengthen your relationships"
            ],
            "talismans": [
              { 
                "name": "Wood Symbol", 
                "element": "Wood", 
                "description": "Carry a small wooden token to enhance your natural element" 
              },
              // Add more talismans
            ]
          },
          "commentary": "Expert analysis paragraph that synthesizes the key findings."
        }

        Base your analysis on traditional BaZi principles, five elements theory, and Chinese astrology. 
        Include specific insights tailored to the person's birth information.
      `;

      // Generate a prompt based on the user data
      const userPrompt = `
        Please provide a BaZi reading based on the following information:
        
        Full Name: ${validatedData.fullName}
        Date of Birth: ${validatedData.birthDate}
        Time of Birth: ${validatedData.birthTime} (${validatedData.isExactTime ? 'Exact' : 'Approximate'})
        Birth City: ${validatedData.birthCity}
        ${validatedData.bloodType ? `Blood Type: ${validatedData.bloodType}` : ''}
        ${validatedData.religion ? `Religion/Spiritual Practice: ${validatedData.religion}` : ''}
        ${validatedData.maritalStatus ? `Marital Status: ${validatedData.maritalStatus}` : ''}
        ${validatedData.currentCity ? `Current City: ${validatedData.currentCity}` : ''}
        ${validatedData.interests && validatedData.interests.length > 0 ? `Areas of Interest: ${validatedData.interests.join(', ')}` : ''}
        
        Please provide a complete, accurate, and detailed BaZi analysis.
      `;

      // Call OpenAI API - using the newest model gpt-4o
      const response = await openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        response_format: { type: "json_object" }
      });

      // Extract the response content
      const content = response.choices[0].message.content;
      
      if (!content) {
        return res.status(500).json({ message: "Failed to generate BaZi analysis" });
      }

      // Parse the JSON response
      const analysisResult = JSON.parse(content);

      // Update the reading record with the analysis result
      await storage.updateBaziReading(baziReading.id, analysisResult);

      // Return the analysis to the client
      return res.status(200).json(analysisResult);
    } catch (error) {
      console.error("Error processing BaZi analysis:", error);
      
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      return res.status(500).json({ message: "Error processing BaZi analysis" });
    }
  });

  // Retrieve a saved BaZi reading
  app.get("/api/bazi-reading/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid reading ID" });
      }
      
      const reading = await storage.getBaziReading(id);
      
      if (!reading) {
        return res.status(404).json({ message: "Reading not found" });
      }
      
      return res.status(200).json(reading);
    } catch (error) {
      console.error("Error retrieving BaZi reading:", error);
      return res.status(500).json({ message: "Error retrieving BaZi reading" });
    }
  });
  
  // Get authenticated user info
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });
  
  // Create a BaZi reading for an authenticated user
  app.post("/api/user/bazi-analysis", isAuthenticated, async (req: any, res) => {
    try {
      // Validate the request body
      const validatedData = baziReadingSchema.parse(req.body);
      const userId = req.user.claims.sub;
      
      // Save the reading data with user ID
      const baziReading = await storage.createBaziReading(validatedData, userId);
      
      // Same OpenAI analysis process as the public endpoint
      const systemPrompt = `
        You are a master of BaZi (Chinese Four Pillars of Destiny) astrology. 
        Analyze the following birth information and provide a detailed BaZi reading.
        
        Return your response as a JSON object with the following structure:
        {
          "chart": {
            "name": "Full name",
            "birthInfo": "Birth date, time and location summary",
            "yearPillar": { "symbol": "Chinese character", "name": "Element and animal" },
            "monthPillar": { "symbol": "Chinese character", "name": "Element and animal" },
            "dayPillar": { "symbol": "Chinese character", "name": "Element and animal" },
            "hourPillar": { "symbol": "Chinese character", "name": "Element and animal" },
            "masterElement": "Primary element",
            "tags": ["Element characteristics", "Personality traits"]
          },
          "personality": ["Trait 1", "Trait 2", "Trait 3", "Trait 4", "Trait 5"],
          "career": {
            "description": "Career analysis",
            "paths": ["Career 1", "Career 2", "Career 3", "Career 4", "Career 5"]
          },
          "relationships": {
            "description": "Relationship style description",
            "compatibilities": [
              { "type": "Element type", "level": "Very High/High/Medium/Low", "percentage": 90 },
              { "type": "Element type", "level": "Very High/High/Medium/Low", "percentage": 60 }
            ]
          },
          "forecast": [
            { "period": "Q1: January-March", "description": "Forecast for this period" },
            { "period": "Q2: April-June", "description": "Forecast for this period" },
            { "period": "Q3: July-September", "description": "Forecast for this period" },
            { "period": "Q4: October-December", "description": "Forecast for this period" }
          ],
          "elements": {
            "wood": 35,
            "fire": 25,
            "earth": 20,
            "metal": 10,
            "water": 10,
            "details": [
              {
                "element": "Wood",
                "strengths": ["Strength 1", "Strength 2", "Strength 3"],
                "weaknesses": ["Weakness 1", "Weakness 2"],
                "expressions": ["Expression 1", "Expression 2", "Expression 3"]
              }
            ],
            "interactions": [
              { "type": "Supportive", "description": "Water nourishes your Wood" },
              { "type": "Challenging", "description": "Metal tends to cut your Wood" },
              { "type": "Balancing need", "description": "More Water element to support growth" }
            ]
          },
          "favorable": {
            "elements": [
              { "element": "Water", "description": "Enhances your creativity and wisdom" },
              { "element": "Metal", "description": "Brings clarity and precision to your actions" }
            ],
            "directions": ["North", "East", "Northeast"],
            "colors": ["Blue", "Black", "Teal", "Silver"]
          },
          "recommendations": {
            "periods": [
              { 
                "timeframe": "February 14 - March 2", 
                "description": "Excellent period for career advancement and new projects.", 
                "type": "Career Growth" 
              }
            ],
            "practices": [
              { 
                "name": "Forest Bathing", 
                "element": "Wood", 
                "description": "Spending time among trees will enhance your dominant Wood element, reducing stress and improving creativity." 
              }
            ],
            "avoidances": [
              { 
                "name": "Excessive Competition", 
                "element": "Fire", 
                "description": "Highly competitive environments may over-stimulate your Fire element, leading to burnout and impulsive decisions." 
              }
            ],
            "environment": {
              "home": ["East-facing workspace to enhance Wood energy", "Blue and black accents in relaxation areas", "Indoor plants to balance your environment", "Minimize red colors in bedroom spaces"],
              "diet": ["Include more black foods (black beans, seaweed)", "Moderate spicy foods that increase Fire", "Add white foods (rice, white fish) for Metal", "Green vegetables to support your Wood"],
              "routine": ["Early morning routine to enhance Wood", "Midday breaks outdoors to balance Fire", "Evening water intake for better equilibrium", "Weekly earth activities for grounding"]
            },
            "fengShui": [
              "Position your desk facing East or North to align with your favorable directions",
              "Your wealth corner (Southeast) should be kept clean and well-lit",
              "Place water features in the North area of your home to enhance career prospects",
              "Add metal decorative items in the West to support structure and clarity",
              "Include a small water fountain in your work area to balance your strong Wood",
              "Earth tones in the Southwest will strengthen your relationships"
            ],
            "talismans": [
              { 
                "name": "Wood Symbol", 
                "element": "Wood", 
                "description": "Carry a small wooden token to enhance your natural element" 
              }
            ]
          },
          "commentary": "Expert analysis paragraph that synthesizes the key findings."
        }

        Base your analysis on traditional BaZi principles, five elements theory, and Chinese astrology. 
        Include specific insights tailored to the person's birth information.
      `;

      const userPrompt = `
        Please provide a BaZi reading based on the following information:
        
        Full Name: ${validatedData.fullName}
        Date of Birth: ${validatedData.birthDate}
        Time of Birth: ${validatedData.birthTime} (${validatedData.isExactTime ? 'Exact' : 'Approximate'})
        Birth City: ${validatedData.birthCity}
        ${validatedData.bloodType ? `Blood Type: ${validatedData.bloodType}` : ''}
        ${validatedData.religion ? `Religion/Spiritual Practice: ${validatedData.religion}` : ''}
        ${validatedData.maritalStatus ? `Marital Status: ${validatedData.maritalStatus}` : ''}
        ${validatedData.currentCity ? `Current City: ${validatedData.currentCity}` : ''}
        ${validatedData.interests && validatedData.interests.length > 0 ? `Areas of Interest: ${validatedData.interests.join(', ')}` : ''}
        
        Please provide a complete, accurate, and detailed BaZi analysis.
      `;

      // Call OpenAI API
      const response = await openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        response_format: { type: "json_object" }
      });

      const content = response.choices[0].message.content;
      
      if (!content) {
        return res.status(500).json({ message: "Failed to generate BaZi analysis" });
      }

      const analysisResult = JSON.parse(content);
      await storage.updateBaziReading(baziReading.id, analysisResult);
      return res.status(200).json(analysisResult);
    } catch (error) {
      console.error("Error processing BaZi analysis:", error);
      
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      return res.status(500).json({ message: "Error processing BaZi analysis" });
    }
  });
  
  // Get user's BaZi readings
  app.get("/api/user/readings", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const readings = await storage.getBaziReadingsByUserId(userId);
      return res.status(200).json(readings);
    } catch (error) {
      console.error("Error retrieving user readings:", error);
      return res.status(500).json({ message: "Error retrieving user readings" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
