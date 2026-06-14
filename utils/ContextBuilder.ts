import { chatSystemPrompt } from "../constants/system-prompts/chatSystemPrompt";
import { explainSystemPrompt } from "../constants/system-prompts/explainSystemPrompt";
import { toolsDescription } from "../constants/toolsDescription";
import { Message, Task } from "../types/types";

/***
 * @returns Message[] - The array of initial messages
 */
export class ContextBuilder {
  async build(task: Task): Promise<Message[]> {
    const messages: Message[] = [];
    const { type, target } = task;

    //__________user_message__________
    if (type === "explain") {
      //__________system_message__________
      messages.push(explainSystemPrompt);

      //__________user_message__________
      messages.push({
        role: "user",
        content: `
              Task - Explain the file/project:

              User asked file/project - ${target}

              # Ignore filename case-sensitiveness
          `,
      });
    } else if (type === "chat") {
      messages.push(chatSystemPrompt);
      messages.push({
        role: "user",
        content: `
              Type of task - ${type}:

              Prompt by user - ${target}
          `,
      });
    }

    return messages;
  }
}
