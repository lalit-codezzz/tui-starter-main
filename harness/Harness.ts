import LLM from "../llm/LLM";
import { Task } from "../types/types";
import { ContextBuilder } from "../utils/ContextBuilder";

class Harness {
  constructor(
    private llm: LLM,
    private contextBuilder: ContextBuilder,
  ) {}

  async run(task: Task): Promise<string> {
    const messages = await this.contextBuilder.build(task);
    console.log(messages);
    const response = this.llm.generate(messages);
    return response;
  }
}

export default Harness;
