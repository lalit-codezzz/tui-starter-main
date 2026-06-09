import { Command } from "commander";
import { Task } from "../types/types";
import { createHarness } from "../harness/createHarness";

const explainCommand = new Command("explain")
  .description("Used to explain files")
  .argument("<filename>", "name of file")
  .action(async (targetFile, options) => {
    try {
      const task: Task = {
        type: "explain",
        target: targetFile,
      };
      const harness = createHarness();

      const response = await harness.run(task);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  });

export default explainCommand;

//   .option("-f, --filename <filename>", "name of the file", "all")
