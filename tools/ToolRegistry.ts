import ReadFileTool from "./ReadFileTool";

class ToolRegistry {
  private tools = new Map();

  constructor() {
    this.tools.set("read_file", new ReadFileTool());
  }

  get(toolName: string) {
    const tool = this.tools.get(toolName);
    if (!tool) {
      throw new Error(`${toolName} tool does not exists!`);
    }
    return tool;
  }
}

export default ToolRegistry;
