import React, { useState, useEffect } from 'react';
import { Box, Text } from 'ink';

interface Props {
  model?: string;
}

const SPINNER = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
const WIDTH = 36;
const BORDER = '='.repeat(WIDTH);

export default function Connecting({ model = 'Gemini' }: Props) {
  const [frame, setFrame] = useState(0);
  const [dots, setDots] = useState('');

  useEffect(() => {
    const spinner = setInterval(() => {
      setFrame(f => (f + 1) % SPINNER.length);
    }, 80);

    const dotsTimer = setInterval(() => {
      setDots(d => (d.length >= 3 ? '' : d + '.'));
    }, 400);

    return () => {
      clearInterval(spinner);
      clearInterval(dotsTimer);
    };
  }, []);

  const label = `Connecting to ${model} model${dots}`;
  const padLeft = Math.floor((WIDTH - label.length) / 2);

  return (
    <Box flexDirection="column">
      <Text color="green">{BORDER}</Text>

      <Box paddingLeft={padLeft} gap={1}>
        <Text color="green">{SPINNER[frame]}</Text>
        <Text color="green" bold>{label}</Text>
      </Box>

      <Text color="green">{BORDER}</Text>
    </Box>
  );
}