import fs from "fs";

const tools = {
  readfileTool: function (pathWithFileName: string) {
    const data = fs.readFileSync(pathWithFileName, "utf-8");
    return data;
  },
};

export default tools;
