import { Tool } from "./Tool";

class ReadFileTool implements Tool {
  name: string;
  description: string;
  constructor() {
    this.name = "read_file";
    this.description = "This tool is used to read the file contents.";
  }
  execute(args: Record<string, unknown>): Promise<string> {
    return Promise.resolve("I am read-file tool!");
  }
}

export default ReadFileTool;
