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
      console.log(fileContent);
      return fileContent;
    } catch (error) {
      console.log("READ_FILE_TOOL_ERROR: ", error);
      throw new Error("File reading error! [from ReadFileTool]");
    }
  }
}

export default ReadFileTool;
