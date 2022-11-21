import { Flex, Text, HStack } from "@cc/ui-chakra";
import NoFoundIcon from "@src/assets/icons/404.svg";

export default function Custom404() {
  return (
    <Flex direction="column" justify="center" align="center" width="100%">
      <HStack>
        <Text fontWeight="bold" fontSize="8xl">
          404
        </Text>
        <NoFoundIcon />
      </HStack>
      <Text fontWeight="bold" fontSize="xl">
        Oops! Something went wrong.
      </Text>
    </Flex>
  );
}
