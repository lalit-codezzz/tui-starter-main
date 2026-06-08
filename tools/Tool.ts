export interface Tool {
  name: string;
  description: string;

  execute(args: Record<string, unknown>): Promise<string>;
}

export interface ToolCall {
  toolName: string;
  arguments: Record<string, unknown>;
}

export interface ToolResult {
  toolName: string;
  result: string;
}
