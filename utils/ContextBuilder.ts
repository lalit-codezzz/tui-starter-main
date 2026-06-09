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
      
      Available tools:
      
      read_file
      Description: This tool is used to read the file contents.
      Arguments:
      {
        "path": "string"
      }

      When you need a tool response only in JSON format like below:
      {
        "toolName": <name_of_the_tool>,
        "arguments": {...}
      }

      - Do not explain why you need the tool.
      - Do not include markdown.
      - Return only JSON.
      `,
    });

    //__________user_message__________
    if (type === "explain") {
      messages.push({
        role: "user",
        content: `
              Task: ${type} the file located at:

              ${target}:
          `,
      });
    }

    return messages;
  }
}
