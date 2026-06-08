import { Message } from "../types/types";

interface LLM {
  generate(messages: Message[]): Promise<string>;
}

export default LLM;
