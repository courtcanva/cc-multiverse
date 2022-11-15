import {
  Button,
  Checkbox,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
} from "@chakra-ui/react";
import useGetOrders, { FormData } from "@src/services/orders/useOrders";
import { useForm } from "react-hook-form";
import { useState } from "react";
import dayjs from "dayjs";
// import * as dayjs from "dayjs";

interface OrderIdList {
  id: string;
}

const defaultValues: FormData = { orders: [] };

const OpenOrdersList = () => {
  const { isLoading, handleAcceptOrderSubmit, getOpenOrders, lists } = useGetOrders();
  const [checked, setChecked] = useState([""]);
  useForm<FormData>({
    defaultValues,
  });

  const change = (e: string[]) => {
    setChecked(e);
  };

  return (
    <Stack>
      <Text>hello js</Text>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Checkbox</Th>
              <Th>Date</Th>
              <Th>Suburb</Th>
              <Th isNumeric>Postcode</Th>
              <Th isNumeric>$ Total</Th>
              <Th>Details</Th>
            </Tr>
          </Thead>
          <Tbody>
            {lists.map((item) => (
              <Tr key={item.id}>
                <Td>
                  <Checkbox key={item.id}></Checkbox>
                </Td>
                <Td>{dayjs(item.createdTime).format("YYYY/MM/DD HH")}</Td>
                <Td>{"-suburb-"}</Td>
                <Td isNumeric>{item.postcode}</Td>
                <Td isNumeric>{item.totalAmount}</Td>
                <Td>
                  <Button colorScheme="teal" size="sm">
                    detail
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Stack>
    // <Container name="openOrders" as="table">
    // </Container>
  );
};

export default OpenOrdersList;
