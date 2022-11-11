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

type OrderDataType = {
  id: number;
  orderId: number;
  status: string;
  contactInformation: object;
};

const OpenOrders = ({ details }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.post("/franchisee/" + "3" + "/accept_orders", {
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
            </Tr>
          </Thead>
          <Tbody>
            {orders?.map((order: any) => (
              <Tr key={order.id}>
                <Td>{order.id}</Td>
                <Td>{order.orderId}</Td>
                <Td>{order.status}</Td>
                <Td>{JSON.stringify(order.contactInformation)}</Td>
                {/* <Button onClick={() => onOpenPopUp(order.id)}>Open Modal</Button> */}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Inside modalBody</Text>
            <Text>details here {JSON.stringify(details)}</Text>
            <Box boxSize="sm">
              <Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
            </Box>
            <Box boxSize="sm">
              <Image src="https://bit.ly/dan-abramov" alt="Dan Abramov" />
            </Box>
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
