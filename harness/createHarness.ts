import GeminiLLM from "../llm/impls/GeminiLLM";
import ToolRegistry from "../tools/ToolRegistry";
import { ContextBuilder } from "../utils/ContextBuilder";
import Harness from "./Harness";


// factory function to create harness
export function createHarness() {
  return new Harness(new GeminiLLM(), new ContextBuilder(), new ToolRegistry());
}