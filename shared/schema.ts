import { pgTable, text, serial, integer, boolean, json, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// BaZi readings schema
export const baziReadings = pgTable("bazi_readings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  fullName: text("full_name").notNull(),
  birthDate: text("birth_date").notNull(),
  birthTime: text("birth_time").notNull(),
  isExactTime: boolean("is_exact_time").notNull(),
  birthCity: text("birth_city").notNull(),
  bloodType: text("blood_type"),
  religion: text("religion"),
  maritalStatus: text("marital_status"),
  currentCity: text("current_city"),
  interests: text("interests").array(),
  reading: json("reading"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const baziReadingSchema = createInsertSchema(baziReadings).omit({
  id: true,
  userId: true,
  reading: true,
  createdAt: true,
});

export type InsertBaziReading = z.infer<typeof baziReadingSchema>;
export type BaziReading = typeof baziReadings.$inferSelect;

// BaZi analysis result schema for API response
export const baziAnalysisSchema = z.object({
  chart: z.object({
    name: z.string(),
    birthInfo: z.string(),
    yearPillar: z.object({
      symbol: z.string(),
      name: z.string(),
    }),
    monthPillar: z.object({
      symbol: z.string(),
      name: z.string(),
    }),
    dayPillar: z.object({
      symbol: z.string(),
      name: z.string(),
    }),
    hourPillar: z.object({
      symbol: z.string(),
      name: z.string(),
    }),
    masterElement: z.string(),
    tags: z.array(z.string()),
  }),
  personality: z.array(z.string()),
  career: z.object({
    description: z.string(),
    paths: z.array(z.string()),
  }),
  relationships: z.object({
    description: z.string(),
    compatibilities: z.array(z.object({
      type: z.string(),
      level: z.string(),
      percentage: z.number(),
    })),
  }),
  forecast: z.array(z.object({
    period: z.string(),
    description: z.string(),
  })),
  elements: z.object({
    wood: z.number(),
    fire: z.number(),
    earth: z.number(),
    metal: z.number(),
    water: z.number(),
    details: z.array(z.object({
      element: z.string(),
      strengths: z.array(z.string()),
      weaknesses: z.array(z.string()),
      expressions: z.array(z.string()),
    })),
    interactions: z.array(z.object({
      type: z.string(),
      description: z.string(),
    })),
  }),
  favorable: z.object({
    elements: z.array(z.object({
      element: z.string(),
      description: z.string(),
    })),
    directions: z.array(z.string()),
    colors: z.array(z.string()),
  }),
  recommendations: z.object({
    periods: z.array(z.object({
      timeframe: z.string(),
      description: z.string(),
      type: z.string(),
    })),
    practices: z.array(z.object({
      name: z.string(),
      element: z.string(),
      description: z.string(),
    })),
    avoidances: z.array(z.object({
      name: z.string(),
      element: z.string(),
      description: z.string(),
    })),
    environment: z.object({
      home: z.array(z.string()),
      diet: z.array(z.string()),
      routine: z.array(z.string()),
    }),
    fengShui: z.array(z.string()),
    talismans: z.array(z.object({
      name: z.string(),
      element: z.string(),
      description: z.string(),
    })),
  }),
  commentary: z.string(),
});

export type BaziAnalysis = z.infer<typeof baziAnalysisSchema>;
