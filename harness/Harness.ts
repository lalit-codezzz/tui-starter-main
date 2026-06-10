import chalk from "chalk";
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
        console.log(chalk.red(`\nInitializing tool call...`));
        const tool = this.toolRegistry.get(response.toolCall.toolName);
        console.log(
          chalk.red(
            "==========================================================================",
          ),
        );
        console.log(
          chalk.red(`    Tool name: ${response.toolCall.toolName}    `),
        );
        console.log(
          chalk.red(`    File : ${response.toolCall.arguments.path}    `),
        );
        console.log(chalk.red(`    Tool description: ${tool.description}    `));
        console.log(
          chalk.red(
            "==========================================================================",
          ),
        );
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
