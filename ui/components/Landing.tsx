import { Box, Text } from "ink";
import figlet from "figlet";
import SupportedModels from "./SupportedModels";

const agentName = figlet.textSync("CASTRO\nC    O     D    E", { font: "big" });

function Landing() {
  return (
    <Box flexDirection="column">

      <Box>
        <Box borderBottom borderStyle={"classic"} paddingX={2} borderColor={"green"} justifyContent="center">
          <Text color="green">Welcome to <Text bold backgroundColor={"green"} italic color="white"> Castro Code </Text> A CLI Coding Agent</Text>
        </Box>
      </Box>
      <Box flexDirection="row">
        <Text color="green">
          {agentName}
        </Text>
      </Box>

      <Box borderStyle={"classic"} flexDirection="column" paddingY={.5} paddingX={2} borderColor={"green"} width="25%">
        <Box borderStyle={"classic"} borderColor={"green"} justifyContent="center">
          <Text backgroundColor={"green"} bold>{" Supported Models "}</Text>
        </Box>
        <SupportedModels />
      </Box>

    </Box>
  );
}

export default Landing;
