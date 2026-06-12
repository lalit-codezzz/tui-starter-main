import chalk from "chalk";
import LLM from "../llm/LLM";
import ToolRegistry from "../tools/ToolRegistry";
import { Task } from "../types/types";
import { ContextBuilder } from "../utils/ContextBuilder";
import delayer from "../utils/delayer";

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
        const msg1 = await delayer("Agent wants to do a tool call...", 1000);
        console.log(chalk.bgYellow(msg1));

        const msg2 = await delayer("Details about tool:", 1000);
        console.log(chalk.bgYellow(msg2));

        const msg3 = await delayer(
          `Tool Name: ${response.toolCall.toolName}`,
          1000,
        );
        console.log(chalk.bgYellow(msg3));

        const input = prompt(chalk.bgYellow("Do you agree? <y/n>"));

        if (input !== "y") {
          console.log(
            chalk.bgRedBright.bold.underline(
              "\nOperation interrupted by User!",
            ),
          );
          return "";
        }

        const msg4 = await delayer(`\nInitializing tool call...`, 1000);
        console.log(chalk.red(msg4));
        const tool = this.toolRegistry.get(response.toolCall.toolName);

        const msg5 = await delayer(`
==========================================================================
    Tool name: ${response.toolCall.toolName}
    File : ${response.toolCall.arguments.path}
    Tool description: ${tool.description}
==========================================================================`,
          1500,
        );

        console.log(chalk.redBright(msg5));

        const toolResult = await tool.execute(response.toolCall.arguments);
        console.log(toolResult);
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
