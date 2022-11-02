import OpenOrders from "./OpenOrders";
import { Grid, GridItem, Image, Text } from "@cc/ui-chakra";

const Orders = () => {
  return (
    <Grid
      templateAreas={`"header header"
                  "nav main"`}
      gridTemplateRows={"50px 1fr 30px"}
      gridTemplateColumns={"150px 1fr"}
      h="200px"
      gap="1"
      color="blackAlpha.700"
      fontWeight="bold"
    >
      <GridItem pl="2" bg="orange.300" area={"header"}>
        Header
      </GridItem>
      <GridItem pl="2" bg="pink.300" area={"nav"}>
        Nav
      </GridItem>
      <GridItem pl="2" bg="green.300" area={"main"}>
        Main
      </GridItem>
    </Grid>
    // <Flex>
    //   <Text fontSize="23" fontWeight="bold">
    //     Open Orders
    //   </Text>
    //   <OpenOrders />
    // </Flex>
    // <Flex>
    //   <Flex>
    //   </Flex>
    //   <Flex></Flex>
    // </Flex>
  );
};

export default Orders;
