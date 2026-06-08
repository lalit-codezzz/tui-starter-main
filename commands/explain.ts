import { Command } from "commander";
import { Task } from "../types/types";
import { createHarness } from "../harness/createHarness";

const explainCommand = new Command("explain")
  .description("Used to explain files")
  .argument("<filename>", "name of file")
  .action(async (targetFile, options) => {
    try {
      const filePath = `${process.cwd()}/${targetFile}`;
      const task: Task = {
        type: "explain",
        target: filePath,
      };
      const harness = createHarness();

      await harness.run(task);
    } catch (error) {
      console.log(error);
    }
  });

export default explainCommand;

//   .option("-f, --filename <filename>", "name of the file", "all")
