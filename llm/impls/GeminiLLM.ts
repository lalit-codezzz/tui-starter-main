import { GoogleGenAI } from "@google/genai";

import { Message } from "../../types/types";
import LLM from "../LLM";

class GeminiLLM implements LLM {
  private client: GoogleGenAI;
  constructor() {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Gemini API Key not found!");
    }
    this.client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }

  async generate(messages: Message[]): Promise<string> {
    const messageContentForGemini = messages.reduce(
      (acc: string, msg: Message) => {
        return (
          acc +
          `
        ${msg.role}:
        ${msg.content}
        `
        );
      },
      ``,
    );

    const response = await this.client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: messageContentForGemini,
    });
    console.log(response.text);

    return response.text ?? "";
    // return Promise.resolve("Gemini LLM");
  }
}

export default GeminiLLM;
