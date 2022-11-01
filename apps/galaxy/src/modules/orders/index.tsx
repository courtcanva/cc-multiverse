import OpenOrders from "./OpenOrders";
import { Flex, Image, Text } from "@cc/ui-chakra";

const Orders = () => {
  return (
    <Flex>
      <Text fontSize="23" fontWeight="bold">
        Open Orders
      </Text>
      <OpenOrders />
    </Flex>
    <Flex>
      <Flex>
      </Flex>
      <Flex></Flex>
    </Flex>
  );
};

export default Orders;
