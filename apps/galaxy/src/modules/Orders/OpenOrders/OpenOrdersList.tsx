import React from "react";
import {
  Button,
  Checkbox,
  DataTable,
  Stack,
  Image,
  Text,
  Link,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@cc/ui-chakra";
import useGetOrders, { DesignInformation } from "@src/services/orders/useOrders";
import dayjs from "dayjs";
import { createColumnHelper } from "@tanstack/react-table";

const OpenOrdersList = () => {
  const { lists } = useGetOrders("pending_orders");
  const { isOpen, onOpen, onClose } = useDisclosure();

  type Orders = {
    id: number;
    createdTime: string;
    postcode: string;
    totalAmount: number;
    designInformation: DesignInformation;
  };

  const columnHelper = createColumnHelper<Orders>();

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => <Checkbox key={info.getValue()} value={info.getValue()}></Checkbox>,
      header: () => <Checkbox></Checkbox>,
    }),
    columnHelper.accessor("createdTime", {
      cell: (info) => dayjs(info.getValue()).format("DD/MM/YYYY"),
      header: "date",
    }),
    columnHelper.accessor("designInformation", {
      cell: (info) => info.getValue().constructionAddress?.city,
      header: "suburb",
    }),
    columnHelper.accessor("postcode", {
      cell: (info) => info.getValue(),
      header: "postcode",
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor("totalAmount", {
      cell: (info) => "$" + info.getValue(),
      header: "total amount",
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor("designInformation", {
      cell: (info) => (
        <>
          <Button onClick={onOpen} variant="secondary">
            details
          </Button>
          <Modal scrollBehavior={"inside"} isOpen={isOpen} onClose={onClose}>
            <ModalContent>
              <ModalHeader>Order Details</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text fontWeight="bold">Quotation</Text>
                <Link color="blue">{info.getValue().quotation}</Link>
                <br />
                <br />
                <Text fontWeight="bold">Construction Design</Text>
                <Image src={info.getValue().constructionDraw} alt="image alt" />
                <br />
                <Text fontWeight="bold">Construction Address</Text>
                <Text>Country: {info.getValue().constructionAddress.country}</Text>
                <Text>City: {info.getValue().constructionAddress.city}</Text>
                <Text>State: {info.getValue().constructionAddress.state}</Text>
                <Text>Postcode: {info.getValue().constructionAddress.postalCode}</Text>
                <Text>Address Line 1: {info.getValue().constructionAddress.line1}</Text>
                <Text>Address Line 2: {info.getValue().constructionAddress.line2}</Text>
                <br />
                <Text fontWeight="bold">Need To Level Ground</Text>
                <Text>{info.getValue().isNeedLevelGround.toString()}</Text>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      ),
      header: "details",
      id: "details",
    }),
  ];
  return (
    <Stack
      border="1px"
      borderBottom="0px"
      borderColor="gray.200"
      borderRadius="lg"
      overflow="hidden"
    >
      <DataTable columns={columns} data={lists} />
    </Stack>
  );
};

export default OpenOrdersList;
