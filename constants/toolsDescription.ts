export const toolsDescription = `
    Available tools:
      
      1. read_file
      Description: This tool is used to read the file contents.
      Arguments:
      {
        "path": "string"
      }

      2. list_files
      Description: It is used to list the files.
      Arguments:
      {
        "path": "string"
      }

      When you need a tool, response in JSON format like below:
      {
        "toolName": <name_of_the_tool>,
        "arguments": {...}
      }
` as const;