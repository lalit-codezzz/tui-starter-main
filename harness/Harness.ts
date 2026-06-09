import LLM from "../llm/LLM";
import ToolRegistry from "../tools/ToolRegistry";
import { Task } from "../types/types";
import { ContextBuilder } from "../utils/ContextBuilder";

class Harness {
  constructor(
    private llm: LLM,
    private contextBuilder: ContextBuilder,
    private toolRegistry: ToolRegistry,
  ) {}

  async run(task: Task): Promise<string> {
    const messages = await this.contextBuilder.build(task);

    // Agent Loop - Heart of the Agent
    while (true) {
      const response = await this.llm.generate(messages);

      if (response.type === "final") {
        return response.content;
      }

      if (response.type === "tool_call") {
        console.log(`Initializing tool call...`);
        const tool = this.toolRegistry.get(response.toolCall.toolName);
        console.log("==================================================================");
        console.log(`Tool name: ${response.toolCall.toolName}`);
        console.log(`Tool description: ${tool.description}`);
        console.log("==================================================================");
        const toolResult = await tool.execute(response.toolCall.arguments);
        messages.push({
          role: "tool",
          content: `
            Tool: ${response.toolCall.toolName}

            Result:
            ${toolResult}
          `,
        });
        continue;
      }
    }
  }
}

export default Harness;
