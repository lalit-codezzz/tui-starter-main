import { Command } from "commander";
import explainFileCommand from "./file";
import explainProjectCommand from "./project";

const explainCommand = new Command("explain")
  .description("Used to explain files / project.")
  .addCommand(explainFileCommand)
  .addCommand(explainProjectCommand);

export default explainCommand;

//   .option("-f, --filename <filename>", "name of the file", "all")
