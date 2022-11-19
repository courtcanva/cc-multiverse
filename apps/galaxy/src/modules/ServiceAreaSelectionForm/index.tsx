import { Flex, VStack, Stack, Text } from "@cc/ui-chakra";
import ServiceAreaSelection from "./ServiceAreaSelectionForm";
import Logo from "@src/components/Logo";

const SelectServiceArea = () => {
  return (
    <Flex justifyContent="center" alignItems="center" width="100%">
      <VStack marginX={{ base: "16px", sm: "16px", md: "200px" }} width={{ lg: "428px" }}>
        <Logo />
        <Text height="72px" fontSize="16px" fontWeight="bold">
          Please select and confirm your service area
        </Text>
        <Stack width="100%">
          <ServiceAreaSelection />
        </Stack>
      </VStack>
    </Flex>
  );
};

export default SelectServiceArea;
