import { GoogleGenAI } from "@google/genai";

import { AgentResponse, Message } from "../../types/types";
import LLM from "../LLM";
import { ToolCall } from "../../tools/Tool";
import chalk from "chalk";

const GOOGLE_CLOUD_PROJECT = "project-e235b4a1-48ab-4eb9-9bd";
const GOOGLE_CLOUD_LOCATION = "global";

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

    console.log(
      chalk.bgYellow(
        "\n=============================",
      ),
    );
    console.log(chalk.bgYellow(chalk.bold(chalk.italic("Connecting to Gemini model..."))));
    console.log(
      chalk.bgYellow(
        "=============================",
      ),
    );

    let response;
    try {
      response = await this.client.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: messageContentForGemini,
      });

      const toolCall: ToolCall = JSON.parse(response.text!);
      return {
        type: "tool_call",
        toolCall,
      };
    } catch (error) {
      // console.log("Error from GeminiLLM: ", error);
    }
    return { type: "final", content: response?.text ?? "" };
  }
}

export default GeminiLLM;
