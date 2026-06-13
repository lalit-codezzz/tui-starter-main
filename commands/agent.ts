import { Command } from "commander";
import { createHarness } from "../harness/createHarness";

export const agentCommand = new Command("agent")
  .description('Runs the agent')
  .option('-p, --prompt <prompt>', 'prompt', '')
  .action((options) => {
    const prompt = options.prompt;

    if (!prompt) {
      console.log("Prompt is required");
      return;
    }

    const harness = createHarness({provider: "gemini"});
    const response = harness.run({type: "chat", target: prompt});
    console.log(response);

  });