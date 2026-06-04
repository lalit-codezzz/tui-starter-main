import { Command } from "commander";

export const modelsCommand = new Command("models")
  .description('Returns all the supported models')
  .option('-m, --model <modelName>', 'name of the model', 'all')
  .action(async (options) => {
    console.log("Listing models...");

    const response = await fetch("https://models.dev/api.json", {method: "GET"});
    const data = await response.json();

    const keys = Object.keys(data);

    let result: string[] = [];

    keys.forEach((key: string) => {
      const modelKeys = Object.keys(data[key].models);
      result = [...result, ...modelKeys];
    })

    console.table(result);

    console.log(options);
});