import fs from "fs/promises";

import { Tool } from "./Tool";

class ReadFileTool implements Tool {
  name: string;
  description: string;
  constructor() {
    this.name = "read_file";
    this.description = "This tool is used to read the file contents.";
  }
  async execute(args: Record<string, unknown>): Promise<string> {
    const { path } = args as { path: string };
    try {
      const fileContent = await fs.readFile(
        `${process.cwd()}/${path}`,
        "utf-8",
      );
      return fileContent;
    } catch (error) {
      const err = error as Error;
      return `ERROR: ${err.message}`;
    }
  }
}

export default ReadFileTool;
