import { apiRequest } from "./queryClient";
import { BaziAnalysis } from "@shared/schema";

// Function to submit BaZi reading request
export async function submitBaziReading(formData: any): Promise<BaziAnalysis> {
  try {
    const response = await apiRequest("POST", "/api/bazi-analysis", formData);
    const result = await response.json();
    return result as BaziAnalysis;
  } catch (error) {
    console.error("Error submitting BaZi reading:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to submit BaZi reading");
  }
}

// Function to retrieve a saved BaZi reading
export async function getBaziReading(id: number): Promise<BaziAnalysis> {
  try {
    const response = await apiRequest("GET", `/api/bazi-reading/${id}`, undefined);
    const result = await response.json();
    return result.reading as BaziAnalysis;
  } catch (error) {
    console.error("Error retrieving BaZi reading:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to retrieve BaZi reading");
  }
}
