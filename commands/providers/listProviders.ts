import fs from "fs/promises";

import { Command } from "commander";
import chalk from "chalk";

export const listProviderCommand = new Command("list")
  .description("Lists all the providers")
  .action(async (options) => {
    try {
      const fileContent = await fs.readFile(
        `${process.cwd()}/.config/config.json`,
        "utf-8",
      );
      const parsed = JSON.parse(fileContent);
      const totalProviders = parsed.providers?.length;

      if (totalProviders > 0) {
        console.log(chalk.greenBright("\n========================================"));
        console.log(chalk.greenBright("Available providers..."));
        console.log(chalk.greenBright("========================================"));
        parsed.providers?.forEach((provider: string, i: number) => {
          console.log(chalk.greenBright(`${i + 1}. ${provider}`));
        });
      } else {
        console.log(chalk.red("\n========================================"));
        console.log(chalk.red("Currently there are no providers..."));
        console.log(chalk.red("========================================"));
      }
    } catch (error) {
      console.log("Error while listing providers...", error);
    }
  });
