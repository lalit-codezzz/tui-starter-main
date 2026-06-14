export const toolsDescription = `
    Available tools:
      
      1. read_file
      Description: This tool is used to read the file contents.
      Arguments:
      {
        "path": "string"
      }

      2. write_file
      Description: This tool is used to write the file contents.
      Arguments:
      {
        "path": "string"
      }
        # Important points for write_file tool:
        - Before writing into the file, make sure the file is already present, or need to be created.

      3. list_files
      Description: It is used to list the files.
      Arguments:
      {
        "path": "string"
      }
        # Important points for list_files tool:
        - Avoid listing files in node_modules folder.
` as const;