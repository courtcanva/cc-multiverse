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

import { useState } from "react";
import axios from "../../services/utils/axios";

type OrderDataType = {
  id: number;
  orderId: number;
  status: string;
  contactInformation: object;
};

const OpenOrders = ({ details }) => {
  // const info = [
  //   { id: 1, name: "Wasif", age: 21, email: "wasif@email.com" },
  //   { id: 2, name: "Ali", age: 19, email: "ali@email.com" },
  //   // { id: 3, name: "Saad", age: 16, email: "saad@email.com" },
  //   // { id: 4, name: "Asad", age: 25, email: "asad@email.com" },
  // ];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  // const [tableInfo, setTableInfo] = useState<Array<TableData>>(info);
  // const [details, setDetails] = useState<Array<OrderDataType>>();

  const onOpenPopUp = async (franchiseId: number) => {
    onOpen();
    setIsLoading(true);
    try {
      const response = await axios.post("/franchisee/" + franchiseId + "/accept_orders", {
        orders: [{ id: 4 }, { id: 5 }, { id: 7 }],
      });
      if (response.status === 200) {
        console.log(typeof response.data.orders);
        // setDetails(response.data.orders);
        console.log("hello ------------------------ " + JSON.stringify(details));
      }
    } catch (error) {
      console.log("error is here -------------------" + error);
      // const err = error as AxiosError;
      // if (err.response?.status === 400) {
      //   toast({
      //     title: "Sign in failed",
      //     description: "Username and password is not authenticated",
      //     status: "error",
      //     duration: 6000,
      //     position: "top",
      //     isClosable: true,
      //   });
      // } else {
      //   toast({
      //     title: err.message,
      //     status: "error",
      //     duration: 6000,
      //     position: "top",
      //     isClosable: true,
      //   });
      // }
    }
    setIsLoading(false);

    // fetch("http://127.0.0.1:8080/api/v1/franchisee/1/accept_orders", {
    //   body: {
    //     orders: [{ id: 1 }, { id: 2 }, { id: 3 }],
    //   },
    //   content-type: "application/json; charset=utf8",
    //   method: "POST",
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setDetails(data);
    //     console.log("hello --------------------- " + data);
    //   });
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
            </Tr>
          </Thead>
          <Tbody>
            {details?.map((detail) => (
              <Tr key={detail.id}>
                <Td>{detail.id}</Td>
                <Td>{detail.orderId}</Td>
                <Td>{detail.status}</Td>
                <Td>{JSON.stringify(detail.contactInformation)}</Td>
                <Button onClick={() => onOpenPopUp(detail.id)}>Open Modal</Button>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {/* <Tr>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td isNumeric>25.4</Td>
              <Button onClick={onOpenPopUp}>Open Modal</Button>
            </Tr>
            <Tr>
              <Td>feet</Td>
              <Td>centimetres (cm)</Td>
              <Td isNumeric>30.48</Td>
              <Button onClick={onOpenPopUp}>Open Modal</Button>
            </Tr>
            <Tr>
              <Td>yards</Td>
              <Td>metres (m)</Td>
              <Td isNumeric>0.91444</Td>
              <Button onClick={onOpenPopUp}>Open Modal</Button>
            </Tr> */}
      {/* </Tbody> */}
      {/* <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Tfoot> */}
      {/* </Table>
      </TableContainer> */}

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

// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await axios.post("/franchisee/" + "1" + "/accept_orders", {
    orders: [{ id: 4 }, { id: 5 }, { id: 7 }],
  });
  const details = await res.data.orders;

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      details,
    },
  };
}
