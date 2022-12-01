import { Flex, HStack, VStack, Sidebar } from "@cc/ui-chakra";
import OpenOrdersList from "@src/modules/Orders/OpenOrders/OpenOrdersList";
import React from "react";
import Logo from "@src/components/Logo";

const OpenOrders = () => {
  return (
    <Flex>
      <HStack>
        <Sidebar />
        <VStack alignContent="center" alignItems="center" h="100%">
          <HStack alignItems="center" marginY="20px">
            <Logo />
          </HStack>
          <OpenOrdersList />
        </VStack>
      </HStack>
    </Flex>
  );
};

export default OpenOrders;
