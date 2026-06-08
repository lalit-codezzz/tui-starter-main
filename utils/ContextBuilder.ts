import fs from "node:fs";

import { Message, Task } from "../types/types";
import { rootDir } from "../cli";
import tools from "../tools/tools";

export class ContextBuilder {
  async build(task: Task): Promise<Message[]> {
    const messages: Message[] = [];

    //__________system_prompt__________
    messages.push({
      role: "system",
      content: "You are a Senior TypeScript Engineer",
    });

    if (task.type === "explain") {
      const filePath = `${rootDir}/${task.target}`;
      const fileData = tools.readfileTool(filePath);
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
      const filePath = `${rootDir}/${task.target}`;
      const fileData = tools.readfileTool(filePath);
      messages.push({
        role: "user",
        content: `
            Read the following file and find the bug:

            Path: ${filePath}

            File Contents:
            ${fileData}
        `,
      });
    }

    return messages;
  }
}
