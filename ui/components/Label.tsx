import { Box, Text } from "ink";

function Label ({text}: {text: string}) {
    return (
        <Box marginY={.5}>
            <Text bold color={"green"}>{text}</Text>
        </Box>
    );
}

export default Label;