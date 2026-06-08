import { Message } from "../../types/types";
import LLM from "../LLM";
class FakeLLM implements LLM {
  generate(messages: Message[]): Promise<string> {
    return Promise.resolve(`Hi from FakeLLM`);
  }
}

export default FakeLLM;
