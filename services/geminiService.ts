
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const SYSTEM_INSTRUCTION = `
You are Fraud Radar AI, a specialized anomaly detection assistant for SMEs.
Your tasks:
1. Explain financial anomalies (e.g., why a transaction splitting pattern is suspicious).
2. Help identify signs of internal fraud (e.g., bills recorded at unusual hours).
3. Provide advice on making QuickBooks/Xero workflows more secure.
4. Interpret Risk Scores in an easy-to-understand way.

Style: Professional, alert, objective, and helpful. Respond in English.
Use accounting terminology (e.g., general ledger, voucher, account coding).
`;

export const sendMessageToGemini = async (
  history: ChatMessage[],
  newMessage: string
): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const model = 'gemini-3-flash-preview'; 
    
    const prompt = `
    Context: User question: "${newMessage}"
    History:
    ${history.map(h => `${h.role}: ${h.text}`).join('\n')}
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I am currently experiencing connection issues with the AI service.";
  }
};
