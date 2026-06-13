import { GoogleGenAI } from "@google/genai";

import { AgentResponse, Message } from "../../types/types";
import LLM from "../LLM";
import { ToolCall } from "../../tools/Tool";
import chalk from "chalk";
import { render } from "ink";
import Connecting from "../../ui/components/Connecting";

class GeminiLLM implements LLM {
  private client: GoogleGenAI;
  constructor() {
    // if (!process.env.GEMINI_API_KEY) {
    //   throw new Error("Gemini API Key not found!");
    // }
    this.client = new GoogleGenAI({
      vertexai: true,
      project: process.env.GOOGLE_CLOUD_PROJECT,
      location: process.env.GOOGLE_CLOUD_LOCATION,
    });
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

    console.log(chalk.green.bold("\n============================="));
    console.log(chalk.green.bold.italic("Connecting to Gemini model..."));
    console.log(chalk.green.bold("============================="));

    let response;
    let parsed;
    try {
      response = await this.client.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: messageContentForGemini,
      });
      parsed = JSON.parse(response.text!);
      if (!parsed.fr) {
        const toolCall: ToolCall = parsed;
        return {
          type: "tool_call",
          toolCall,
        };
      }
    } catch (error) {
      console.log("Error from GeminiLLM: ", error);
    }
    return { type: "final", content: parsed.c ?? "" };
  }
}

export default GeminiLLM;
