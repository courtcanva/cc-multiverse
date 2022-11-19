import { Box, Flex, HStack, Image, Stack, Text, VStack } from "@cc/ui-chakra";
import OpenOrdersList from "@src/modules/Orders/OpenOrders/OpenOrdersList";
import React from "react";

const OpenOrders = () => {
  return (
    <Flex w="100%">
      <Stack width="200px" height="calc(100vh-64px)">
        <Box bg="red" height={"100%"}>
          Sidebar
        </Box>
      </Stack>

      <VStack w="100%" marginX={{ base: "16px", sm: "16px", md: "20px" }}>
        <HStack spacing="20px" alignItems="center" marginY="20px">
          <Image
            boxSize="64px"
            alt="dashboard-logo-192x192"
            src="/assets/dashboard-logo-192x192.png"
          />
          <Text fontSize="1.5rem">CourtCanva</Text>
        </HStack>
        <OpenOrdersList />
      </VStack>
    </Flex>
  );
};

export default OpenOrders;
