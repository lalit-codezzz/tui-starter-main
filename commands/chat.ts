import { Command } from "commander";
import { createHarness } from "../harness/createHarness";
import { render } from "ink";
import FinalResponse from "../ui/components/FinalResponse";

export const chatCommand = new Command("chat")
  .description("Runs the agent")
  .argument("<chat>")
  .action(async (chat, options) => {
    const harness = createHarness({ provider: "gemini" });
    const response = await harness.run({ type: "chat", target: chat });
    render(FinalResponse({ data: response }));
  });
