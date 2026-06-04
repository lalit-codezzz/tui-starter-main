import { Command } from "commander";
import { authData } from "../../auth";

export const listProviderCommand = new Command("list")
  .description("Lists all the providers")
  .action((options) => {
    const keys = Object.keys(authData);
    console.table(keys);
  });
