import OpenOrders from "./OpenOrders";
import { Flex, Image, Text } from "@cc/ui-chakra";

const Orders = () => {
  return (
    <>
      <Text fontSize="23" fontWeight="bold">
        Open Orders
      </Text>
      <OpenOrders />
    </>
  );
};

export default Orders;
