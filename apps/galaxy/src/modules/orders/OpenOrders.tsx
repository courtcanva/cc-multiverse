import {
  Flex,
  Image,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@cc/ui-chakra";
import { type } from "os";

import { useState, useEffect } from "react";
import axios from "../../services/utils/axios";
import { useToast } from "@cc/ui-chakra";
import { AxiosError } from "axios";
import { getToken, getFranchiseeId } from "../../utils/tokenService";
import { string } from "yup/lib/locale";
import { optimize } from "webpack";

type OrderDataType = {
  id: number;
  orderId: string;
  status: string;
  contactInformation: string;
};

const OpenOrders = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const [orders, setOrders] = useState<Array<OrderDataType>>([
    { id: -1, orderId: "", status: "", contactInformation: "" },
  ]);
  const [details, setDetails] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const franchiseeId = getFranchiseeId(getToken());
      try {
        const response = await axios.post("/franchisee/" + franchiseeId + "/accept_orders", {
          orders: [{ id: 4 }, { id: 5 }, { id: 6 }],
        });
        if (response.status === 200) {
          setOrders(response.data.orders);
        }
      } catch (error) {
        const err = error as AxiosError;
        if (err.response?.status === 400) {
          toast({
            title: "Sign in failed",
            description: "Username and password is not authenticated",
            status: "error",
            duration: 6000,
            position: "top",
            isClosable: true,
          });
        } else {
          toast({
            title: err.message,
            status: "error",
            duration: 6000,
            position: "top",
            isClosable: true,
          });
        }
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const onOpenPopUp = (id: number) => {
    const order: OrderDataType | undefined = orders.find((order) => order.orderId == id.toString());
    if (order != undefined) {
      setDetails(order.contactInformation);
    }
    onOpen();
  };

  return (
    <Flex>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>id</Th>
              <Th>orderId</Th>
              <Th>status</Th>
              <Th>contactInformation</Th>
              <Th>details</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders.map((order: OrderDataType) => (
              <Tr key={order.id}>
                <Td>{order.id}</Td>
                <Td>{order.orderId}</Td>
                <Td>{order.status}</Td>
                <Td>{order.contactInformation}</Td>
                <Td>
                  <Button onClick={() => onOpenPopUp(order.id)}>More Details</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>details here {details}</Text>
            <Text>design picture here</Text>
            <Box boxSize="sm">
              <Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
export default OpenOrders;
