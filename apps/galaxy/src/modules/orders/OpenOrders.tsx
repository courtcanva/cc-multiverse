import { Flex, Image, Text } from "@cc/ui-chakra";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
} from "@chakra-ui/react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "../../services/utils/axios";

const OpenOrders = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState("");
  const onOpenPopUp = async () => {
    onOpen;
    setIsLoading(true);
    try {
      const response = await axios.post("/franchisee/1/accept_orders", {
        body: { orders: [{ id: 1 }, { id: 2 }, { id: 3 }] },
      });
      if (response.status === 200) {
        setDetails(JSON.stringify(response));
        console.log("hello ------------------------ " + response);
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
      <Text>inside open orders</Text>

      <Button onClick={onOpenPopUp}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Inside modalBody</Text>
            <Text>is it loading? {isLoading}</Text>
            <Text>details here {details}</Text>
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
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Popover>
        <PopoverTrigger>
          <Button>Trigger</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Confirmation!</PopoverHeader>
          <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};
export default OpenOrders;
