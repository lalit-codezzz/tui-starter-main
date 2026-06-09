import { GoogleGenAI } from "@google/genai";

import { AgentResponse, Message } from "../../types/types";
import LLM from "../LLM";
import { ToolCall } from "../../tools/Tool";

class GeminiLLM implements LLM {
  private client: GoogleGenAI;
  constructor() {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Gemini API Key not found!");
    }
    this.client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }

  async generate(messages: Message[]): Promise<AgentResponse> {
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

    try {
      const toolCall: ToolCall = JSON.parse(response.text!);
      return {
        type: "tool_call",
        toolCall,
      };
    } catch (error) {
      console.log("Error from GeminiLLM: ", error);
    }
    return { type: "final", content: response.text ?? "" };
  }
}

export default GeminiLLM;
