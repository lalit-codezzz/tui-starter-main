import GeminiLLM from "../llm/impls/GeminiLLM";
import OpenRouterLLM from "../llm/impls/OpenRouterLLM";
import ToolRegistry from "../tools/ToolRegistry";
import { ContextBuilder } from "../utils/ContextBuilder";
import Harness from "./Harness";

// factory function to create harness
export function createHarness({ provider }: { provider: string }) {
  let llm;
  if (provider === "openrouter") {
    llm = new OpenRouterLLM();
  } else if (provider === "gemini") {
    llm = new GeminiLLM();
  }
  return new Harness(llm!, new ContextBuilder(), new ToolRegistry());
}
