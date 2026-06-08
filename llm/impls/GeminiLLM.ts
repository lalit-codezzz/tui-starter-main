import { Message } from "../../types/types";
import LLM from "../LLM";

class GeminiLLM implements LLM {
  constructor() {}

  generate(messages: Message[]): Promise<string> {
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

    console.log(messageContentForGemini);

    return Promise.resolve("Hi gemini provider");
  }
}

export default GeminiLLM;
