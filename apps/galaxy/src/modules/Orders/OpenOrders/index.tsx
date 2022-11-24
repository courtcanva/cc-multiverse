import { Flex, HStack, Image, Text, VStack } from "@cc/ui-chakra";
import OpenOrdersList from "@src/modules/Orders/OpenOrders/OpenOrdersList";
import React from "react";

const OpenOrders = () => {
  return (
    <Flex w="100%">
      <VStack w="100%" marginX={{ base: "0px", sm: "16px", md: "20px" }}>
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
