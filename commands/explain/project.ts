import { Command } from "commander";
import { createHarness } from "../../harness/createHarness";
import { Task } from "../../types/types";
import FinalResponse from "../../ui/components/FinalResponse";
import { render } from "ink";

const explainProjectCommand = new Command("project");

explainProjectCommand
  .description("It explains the project.")
  .action(async () => {
    try {
      const task: Task = {
        type: "explain",
        target: ".",
      };
      const harness = createHarness({ provider: "gemini" });
      const response = await harness.run(task);
      render(FinalResponse({ data: response }));
    } catch (error) {
      console.log(error);
    }
  });

export default explainProjectCommand;
