import { Text } from "@cc/ui-chakra";
import OpenOrdersList from "@src/modules/DisplayOrders/OpenOrders/OpenOrdersList";

const OpenOrders = () => {
  return (
    <>
      <Text fontSize="20" fontWeight="bold">
        Open Orders List
      </Text>
      <OpenOrdersList />
    </>
  );
};

export default OpenOrders;
