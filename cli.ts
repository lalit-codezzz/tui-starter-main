import { program } from "commander";

import { modelsCommand } from "./commands/models";
import { agentCommand } from "./commands/agent";
import { providerCommand } from "./commands/providers";
import { readfileCommand } from "./file_commands/readFile";
import explainCommand from "./commands/explain";

export const rootDir = __dirname;

program
  .name("opencode")
  .description("Coding agent cli")
  .version("0.1.0")
  .addCommand(modelsCommand)
  .addCommand(agentCommand)
  .addCommand(providerCommand)
  .addCommand(readfileCommand)
  .addCommand(explainCommand);

program.parse();
