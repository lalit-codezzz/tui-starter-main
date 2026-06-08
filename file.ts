// import Harness from "./utils/Harness";
// import FakeLLM from "./llm/impls/FakeLLM";
// import GeminiLLM from "./llm/impls/GeminiLLM";
// import { Task } from "./types/types";
// import { ContextBuilder } from "./utils/ContextBuilder";

// const task: Task = {
//   type: "explain",
//   target: "/tsconfig.json",
// };

// const harness = new Harness(new GeminiLLM(), new ContextBuilder());

// async function run() {
//   const result = await harness.run(task);
//   console.log(result);
// }

// run();