import { ToolCall } from "../tools/Tool";

type TaskType = "explain" | "bug" | "fix" | "chat" | "review";

export interface Task {
  type: TaskType;
  target: string;
}

export type User = "user";
export type System = "system";
export type Assistant = "assistant";
export type Tool = "tool";

export interface Message {
  role: User | System | Assistant | Tool;
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
