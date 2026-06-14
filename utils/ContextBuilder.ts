import { toolsDescription } from "../constants/toolsDescription";
import { Message, Task } from "../types/types";

/***
 * @returns Message[] - The array of initial messages
 */
export class ContextBuilder {
  async build(task: Task): Promise<Message[]> {
    const messages: Message[] = [];
    const { type, target } = task;

    //__________system_message__________
    messages.push({
      role: "system",
      content: `
      You are a Senior TypeScript Engineer

      ${toolsDescription}

      When task is done, then return response format like below:
      {
        fr: true,
        c: [
            {
              key: <heading>
              value: [
                <content under this heading>,
                <...>,
                <...>,
                .
                .
              ]
            }
          ]
      }
      - Do not explain why you need the tool.
      - Do not include markdown.
      `,
    });

    //__________user_message__________
    if (type === "explain") {
      messages.push({
        role: "user",
        content: `
              Task: ${type} the file/repo located at:

              ${target}:
          `,
      });
    } else if (type === "chat") {
      messages.push({
        role: "user",
        content: `
              Task: ${type}:

              Implement below operation given by user:
              ${target}:
          `,
      });
    }

    return messages;
  }
}
