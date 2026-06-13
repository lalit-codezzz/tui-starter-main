import { Box, Text } from "ink";
import { supportedModels } from "../../constants/supportedModels";

function SupportedModels() {
    return (
        <Box flexDirection="column">
            {
                supportedModels.map((model, i) => {
                    return <Box>
                        <Text color="green" bold>{`${i+1}. ${model.label}`}</Text>
                    </Box>
                })
            }
        </Box>
    );
};

export default SupportedModels;