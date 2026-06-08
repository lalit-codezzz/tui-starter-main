import { Message, Task } from "../types/types";
import { rootDir } from "../cli";

export class ContextBuilder {
  async build(task: Task): Promise<Message[]> {
    const messages: Message[] = [];

    //__________system_prompt__________
    messages.push({
      role: "system",
      content: "You are a Senior TypeScript Engineer",
    });

    if (task.type === "explain") {
      // const fileData = tools.readfileTool(task.target);
      const fileData = "Fake data explain";
      messages.push({
        role: "user",
        content: `
            Explain the following file:

            Path: ${rootDir}/${task.target}

            File Contents:
            ${fileData}
        `,
      });
    } else if (task.type === "bug") {
      // const fileData = tools.readfileTool(task.target);
      const fileData = "Fake data bug";
      messages.push({
        role: "user",
        content: `
            Read the following file and find the bug:

            Path: ${task.target}

            File Contents:
            ${fileData}
        `,
      });
    }

    return messages;
  }
}
