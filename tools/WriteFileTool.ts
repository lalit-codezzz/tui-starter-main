import { Tool } from "./Tool";

class WriteFileTool implements Tool {
  name: string;
  description: string;
  constructor() {
    this.name = "write_file";
    this.description = "This tool is used to write files.";
  }

  async execute(): Promise<string> {
    
    return Promise.resolve("");
  }
}

export default WriteFileTool;
