import { Message } from "../../types/types";
import { toolsDescription } from "../toolsDescription";

export const chatSystemPrompt: Message = {
  role: "system",
  content: `

    ${toolsDescription}

    # When you need a tool, response in JSON format like below:
      {
        "toolName": <name_of_the_tool>,
        "arguments": {...}
      }

    # If response is not tool call then, structure should be in below JSON format:
      {
  "final": true,
  "sections": [
    {
      "heading": "<short title for this section>",
      "points": [
        "<concise point about the heading>",
        "<...>"
      ]
    }
  ]

    `,
} as const;
