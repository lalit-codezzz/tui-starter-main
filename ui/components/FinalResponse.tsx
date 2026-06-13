import React from 'react';
import { Box, Text } from 'ink';

interface Section {
    key: string;
    value: string[];
}

interface Props {
    data: unknown;
}

const COLORS = ['cyan', 'magenta', 'yellow', 'green'];

export default function FinalResponse({ data }: Props) {
    return (
        <Box flexDirection="column" gap={1} paddingX={1} paddingY={1}>

            {/* Header */}
            <Box gap={2}>
                <Text color="cyan" bold>◈ Analysis Result</Text>
                <Text dimColor>─────────────────────────────</Text>
            </Box>

            {/* Sections */}
            {Array.isArray(data) && data?.map((section, i) => {
                const color = COLORS[i % COLORS.length];
                return (
                    <Box key={section.key} flexDirection="column" gap={0} marginTop={1}>

                        {/* Section title with left accent bar */}
                        <Box gap={1}>
                            <Text color={color} bold>{'┃'}</Text>
                            <Text color={color} bold>{section.key}</Text>
                        </Box>

                        {/* Values */}
                        {section.value.map((line: string, j: number) => (
                            <Box key={j} gap={1} paddingLeft={2}>
                                <Text color={color}>{'›'}</Text>
                                <Text color="white">{line}</Text>
                            </Box>
                        ))}

                    </Box>
                );
            })}

            {/* Footer */}
            <Box marginTop={1} gap={2}>
                <Text dimColor>─────────────────────────────</Text>
                <Text color="green">✓ Done</Text>
            </Box>

        </Box>
    );
}