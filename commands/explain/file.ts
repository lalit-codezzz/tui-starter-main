import { Command } from "commander";
import { createHarness } from "../../harness/createHarness";
import { Task } from "../../types/types";
import { render } from "ink";
import FinalResponse from "../../ui/components/FinalResponse";

const explainFileCommand = new Command("file");

explainFileCommand
  .description("It explains a file.")
  .argument("<filename>", "name of the file")
  .action(async (targetFile) => {
    try {
      const task: Task = {
        type: "explain",
        target: targetFile,
      };
      const harness = createHarness({ provider: "gemini" });
      const response = await harness.run(task);
      render(FinalResponse({ data: response }));
    } catch (error) {
      console.log(error);
    }
  });

export default explainFileCommand;
