import { Flex, Stack, Text, VStack, Box, HStack } from "@cc/ui-chakra";
import OpenOrdersList from "@src/modules/Orders/OpenOrders/OpenOrdersList";
import Logo from "@src/components/Logo";

const OpenOrders = () => {
  return (
    <Flex w="100%">
      <Stack width="200px" h="100vh">
        <Box bg="red" h="100vh">
          Sidebar
        </Box>
      </Stack>

      <VStack w="100%" marginX={{ base: "16px", sm: "16px", md: "20px" }}>
        <HStack spacing="20px" alignItems="center">
          <Logo showText={false} />
          <Text fontSize="22px" fontWeight="bold">
            CourtCanva
          </Text>
        </HStack>
        <OpenOrdersList />
      </VStack>
    </Flex>
  );
};

export default OpenOrders;
