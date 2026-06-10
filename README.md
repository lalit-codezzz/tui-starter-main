# CLI AI Agent (TypeScript)

A minimal AI-powered CLI coding agent built in TypeScript.

This project explores how modern coding agents such as Claude Code, Aider, Cursor, and OpenCode work internally by implementing the core building blocks from scratch:

* LLM abstraction
* Agent loop (Harness)
* Tool calling
* Context building
* Tool registry
* File system tools
* Multi-provider support (planned)

The goal is to understand the architecture of AI agents rather than simply wrapping an LLM API.

---

## Features

### Agent Runtime

* Harness-based agent execution loop
* Tool calling support
* Conversation context management
* Provider-agnostic LLM interface

### Current Tools

#### read_file

Reads the contents of a file.

Example:

```bash
explain src/auth.ts
```

The agent can:

1. Request the `read_file` tool
2. Receive file contents
3. Generate an explanation

---

#### list_files

Lists files and directories within a given path.

Example:

```bash
explain .
```

The agent can inspect repository structure before deciding which files to read.

---

## Architecture

```text
CLI Command
     │
     ▼
   Task
     │
     ▼
ContextBuilder
     │
     ▼
  Harness
     │
     ▼
    LLM
     │
     ▼
Agent Response
     │
 ┌───┴─────────┐
 │             │
 ▼             ▼
Final      Tool Call
Answer
               │
               ▼
        Tool Registry
               │
               ▼
            Tool
               │
               ▼
          Tool Result
               │
               ▼
            Harness
```

---

## Project Structure

```text
src/

commands/
├── explain.ts

harness/
├── Harness.ts

llm/
├── LLM.ts
└── impls/
    └── GeminiLLM.ts

tools/
├── Tool.ts
├── ToolRegistry.ts
├── ReadFileTool.ts
└── ListFilesTool.ts

types/
└── types.ts

utils/
└── ContextBuilder.ts
```

---

## Core Concepts

### Harness

The Harness is the heart of the agent.

Responsibilities:

* Execute the agent loop
* Call the LLM
* Execute tools
* Feed tool results back to the model
* Return final responses

Pseudo-flow:

```text
Build Context
      │
      ▼

Call LLM
      │
      ▼

Tool Call?
 ├── No → Return Answer
 │
 └── Yes
        │
        ▼
   Execute Tool
        │
        ▼
 Append Result
        │
        ▼
     Call LLM Again
```

---

### LLM Abstraction

The agent depends on an interface instead of a specific provider.

```text
LLM
 ├── GeminiLLM
 ├── OpenRouterLLM (planned)
 ├── OpenAILLM (planned)
 └── ClaudeLLM (planned)
```

This allows the Harness to remain unchanged while swapping providers.

---

### Tools

Tools allow the model to interact with the local environment.

Current examples:

* read_file
* list_files

Future examples:

* write_file
* grep
* search_code
* tree
* execute_command

---

## Example Workflow

User command:

```bash
bun cli.ts explain src/auth.ts
```

Agent flow:

```text
User Request
      │
      ▼
Explain auth.ts
      │
      ▼
LLM requests read_file
      │
      ▼
Tool reads file
      │
      ▼
Tool result returned
      │
      ▼
LLM explains file
      │
      ▼
Final Response
```

---

## Future Roadmap

### Phase 1 (Current)

* [x] CLI commands
* [x] Harness
* [x] Gemini integration
* [x] Tool registry
* [x] read_file
* [x] list_files

### Phase 2

* [ ] AgentState
* [ ] Execution tracing
* [ ] Iteration limits
* [ ] Better tool schemas

### Phase 3

* [ ] search_code
* [ ] tree tool
* [ ] repository exploration

### Phase 4

* [ ] write_file
* [ ] diff generation
* [ ] file modification workflows

### Phase 5

* [ ] Multiple providers
* [ ] OpenRouter
* [ ] OpenAI
* [ ] Anthropic
* [ ] Local models via Ollama

---

## Motivation

The purpose of this project is educational.

Instead of relying on existing agent frameworks, this project rebuilds the core components from scratch to understand:

* How coding agents reason
* How tool calling works
* How context is managed
* How LLM providers are integrated
* How modern AI developer tools are architected

The end goal is to evolve this project into a lightweight CLI coding agent capable of exploring, understanding, and modifying codebases.
