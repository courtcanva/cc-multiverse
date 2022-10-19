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

const OpenOrders = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex>
      <Text>inside open orders</Text>

      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Inside modalBody</Text>
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
