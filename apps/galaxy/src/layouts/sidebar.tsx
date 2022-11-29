import React from "react";
import { VStack, Link as CKLink } from "@chakra-ui/react";
import Link from "next/link";
import Logo from "@src/components/Logo";

export function Sidebar() {
  return (
    <>
      <VStack
        display={["none", "flex"]}
        justifyContent="space-between"
        spacing="4rem"
        m="1rem"
        borderRadius="1rem"
        maxW="21rem"
        p="4rem 0 6rem"
        bg="linear-gradient(179deg, #465d78, #4a4050)"
        color="#F8F5F1"
        fontSize="1.6rem"
      >
        <VStack alignSelf="stretch" spacing="2rem">
          <VStack alignSelf="stretch" alignItems="stretch" spacing="4rem" pl="2rem">
            <Link href={"/sign-up"}>
              <CKLink color="blue">Open orders</CKLink>
            </Link>
            <Link href={"/sign-up"}>
              <CKLink color="blue">Accept orders</CKLink>
            </Link>
          </VStack>
        </VStack>
        <Logo />
      </VStack>
    </>
  );
}
