import { OpenAI } from "openai";

import { AgentResponse, Message, User } from "../../types/types";
import LLM from "../LLM";
import { ToolCall } from "../../tools/Tool";

class OpenRouterLLM implements LLM {
  private client;
  constructor() {
    if (!process.env.OPEN_ROUTER_API_KEY) {
      throw new Error("OpenRouter API Key not found!");
    }
    this.client = new OpenAI({
      apiKey: process.env.OPEN_ROUTER_API_KEY!,
      baseURL: "https://openrouter.ai/api/v1",
    });
  }

  async generate(messages: Message[]): Promise<AgentResponse> {
    const messageContentForNemotron3Ultra = messages.reduce(
      (acc: string, msg: Message) => {
        return (
          acc +
          `
            ${msg.role}
            ${msg.content}
          `
        );
      },
      "",
    );

    console.log(1111);

    const response = await this.client.chat.completions.create({
      model: "nvidia/nemotron-3-ultra-550b-a55b:free",
      messages: messages.map((msg: Message) => ({
        role: msg.role as User,
        content: msg.content,
      })),
      stream: false,
      // reasoning_effort: "none"
    });

    console.log("ROLE: ", response.choices[0].message.role);
    console.log("MESSAGE: ", response.choices[0].message);
    // const content = response.choices[0].message.content;

    // try {
    //   const toolCall: ToolCall = JSON.parse(content!);
    //   console.log(toolCall);
    //   return {
    //     type: "tool_call",
    //     toolCall,
    //   };
    // } catch (error) {
    //   console.log("Error from OpenRouter LLM: ", error);
    // }
    return { type: "final", content: "content" };
  }
}

export default OpenRouterLLM;
