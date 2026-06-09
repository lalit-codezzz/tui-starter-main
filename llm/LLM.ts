import { AgentResponse, Message } from "../types/types";

interface LLM {
  generate(messages: Message[]): Promise<AgentResponse>;
}

export default LLM;
