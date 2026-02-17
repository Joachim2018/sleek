
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

/**
 * Uses Gemini to generate a catchy caption based on a topic or hashtags.
 */
export async function generateAICaption(prompt: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a viral TikTok-style caption for a video about: ${prompt}. Include 3 trending hashtags. Keep it under 150 characters.`,
      config: {
        temperature: 0.8,
        topP: 0.95,
      },
    });
    return response.text?.trim() || "Stay Sleek! #viral #fyp";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "New vibes coming through! 🔥 #sleek #foryou";
  }
}

/**
 * Uses Gemini to explain the 'Vibe' of a video's metadata for the FYP algorithm simulation.
 */
export async function analyzeVideoVibe(caption: string, tags: string[]): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze this video metadata: Caption: "${caption}", Tags: ${tags.join(', ')}. Summarize the "vibe" in 5 words or less.`,
      config: {
        temperature: 0.2,
      },
    });
    return response.text?.trim() || "General Vibe";
  } catch {
    return "Cool Vibes";
  }
}

/**
 * Smart Comment Moderator
 */
export async function moderateComment(text: string): Promise<{ isSafe: boolean; reason?: string }> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Moderator check: Is this comment safe, respectful, and non-toxic? Comment: "${text}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isSafe: { type: Type.BOOLEAN },
            reason: { type: Type.STRING }
          },
          required: ["isSafe"]
        }
      }
    });
    return JSON.parse(response.text || '{"isSafe": true}');
  } catch {
    return { isSafe: true };
  }
}
