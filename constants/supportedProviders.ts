const providers = [
  {
    name: 'Anthropic',
    color: 'magenta',
    models: [
      { id: 'claude-opus-4-6',   label: 'Opus 4.6',   desc: 'Most powerful' },
      { id: 'claude-sonnet-4-6', label: 'Sonnet 4.6', desc: 'Balanced' },
      { id: 'claude-haiku-4-5',  label: 'Haiku 4.5',  desc: 'Fastest' },
    ],
  },
  {
    name: 'OpenAI',
    color: 'green',
    models: [
      { id: 'gpt-4o',       label: 'GPT-4o',      desc: 'Flagship' },
      { id: 'gpt-4o-mini',  label: 'GPT-4o Mini', desc: 'Fast & cheap' },
      { id: 'o3',           label: 'o3',           desc: 'Reasoning' },
    ],
  },
  {
    name: 'Google',
    color: 'blue',
    models: [
      { id: 'gemini-2.5-pro',   label: 'Gemini 2.5 Pro',   desc: 'Best reasoning' },
      { id: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash', desc: 'Fast' },
    ],
  },
  {
    name: 'Meta',
    color: 'cyan',
    models: [
      { id: 'llama-3.3-70b', label: 'Llama 3.3 70B', desc: 'Best open source' },
      { id: 'llama-3.1-8b',  label: 'Llama 3.1 8B',  desc: 'Local/lightweight' },
    ],
  },
];