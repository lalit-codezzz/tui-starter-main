#!/usr/bin/env bun

import { program } from "commander";

import { modelsCommand } from "./commands/models";
import { agentCommand } from "./commands/agent";
import { providerCommand } from "./commands/providers";
import explainCommand from "./commands/explain/explain";
import { render } from "ink";

import Landing from "./ui/components/Landing";

program
  .name("castro")
  .description("Coding agent cli")
  .version("0.1.0")
  .addCommand(modelsCommand)
  .addCommand(agentCommand)
  .addCommand(providerCommand)
  .addCommand(explainCommand).action(() => {
    render(Landing());
  });


program.parse();
