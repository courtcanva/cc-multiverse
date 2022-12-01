import { VStack, HStack, Text, Divider, Link as CKLink } from "@chakra-ui/react";
import { CalendarIcon, CheckCircleIcon } from "@chakra-ui/icons";
import Link from "next/link";
import Logo from "../../../../../apps/galaxy/src/components/Logo";

export function Sidebar() {
  return (
    <>
      <VStack
        w="200px"
        h="98%"
        display="flex"
        margin-top="200px"
        justifyContent="space-between"
        spacing="2rem"
        m="0.5rem"
        borderRadius="1rem"
        maxW="25rem"
        p="2rem 0 6rem"
        bg="#dfe2e5"
        color="black"
        fontSize="1rem"
      >
        <VStack alignSelf="stretch" spacing="5rem">
          <VStack spacing="4" pl="0.25rem">
            <VStack h="100px" p={4}>
              <Text fontSize="2xl">My Orders</Text>
              <Divider borderColor={"#49b785"} />
            </VStack>
            <Link href={"/open-orders"}>
              <HStack>
                <CalendarIcon />
                <CKLink color="#595a5c">Open orders</CKLink>
              </HStack>
            </Link>
            <Link href={"/accepted-orders"}>
              <HStack>
                <CheckCircleIcon />
                <CKLink color="#595a5c">Accept orders</CKLink>
              </HStack>
            </Link>
          </VStack>
        </VStack>
        <Logo />
      </VStack>
    </>
  );
}
