type TaskType =
  | "explain"
  | "bug"
  | "fix"
  | "chat"
  | "review";

export interface Task {
  type: TaskType;
  target: string;
}

export interface Message {
    role: "system" | "user" | "assistant";
    content: string;
}