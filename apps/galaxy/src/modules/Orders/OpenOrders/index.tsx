import { Flex, HStack, VStack, Image, Text, Sidebar } from "@cc/ui-chakra";
import OpenOrdersList from "@src/modules/Orders/OpenOrders/OpenOrdersList";
import React from "react";
import Logo from "@src/components/Logo";

const OpenOrders = () => {
  return (
    <Flex width="100%">
      <Sidebar />
      <VStack alignContent="center" alignItems="center" h="100%" width="100%">
        <HStack alignItems="center" marginY="20px">
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
