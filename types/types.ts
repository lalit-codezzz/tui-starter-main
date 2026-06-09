import { ToolCall } from "../tools/Tool";

type TaskType = "explain" | "bug" | "fix" | "chat" | "review";

export interface Task {
  type: TaskType;
  target: string;
}

export interface Message {
  role: "system" | "user" | "assistant" | "tool";
  content: string;
}

interface FinalResponse {
  type: "final";
  content: string;
}

export interface ToolCallResponse {
  type: "tool_call";
  toolCall: ToolCall;
}

export type AgentResponse = FinalResponse | ToolCallResponse;
