import fs from "fs/promises";

import { Tool } from "./Tool";

class ListFilesTool implements Tool {
  name: string;
  description: string;
  constructor() {
    ((this.name = "list_files"),
      (this.description = "It is used to list the files."));
  }

  async execute(args: Record<string, unknown>): Promise<string> {
    const { path } = args as { path: string };
    let dirContents;
    try {
      dirContents = await fs.readdir(`${path}`, {
        withFileTypes: true,
      });
    } catch (error) {
      const err = error as Error;
      return `ERROR: ${err.message}`
    }

    const content = dirContents?.reduce((acc, entry) => {
      if (entry.isFile()) {
        return `${acc} + 📄 ${entry.name}`;
      } else {
        return `${acc} + 📂 ${entry.name}`;
      }
    }, ``);

    return content ?? "";
  }
}

export default ListFilesTool;
