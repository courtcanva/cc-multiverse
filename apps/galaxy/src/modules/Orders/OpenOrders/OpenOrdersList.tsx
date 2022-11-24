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
                <Link href={info.getValue().quotation} color="blue">
                  click to see quotation here
                </Link>
                <br />
                <br />
                <Text fontWeight="bold">Design Preview</Text>
                <Image src={info.getValue().constructionDraw} alt="construction design alt" />
                <br />
                <Text fontWeight="bold">Court Details</Text>
                <Text>design name: {info.getValue().design.designName}</Text>
                <Text>tile color: {info.getValue().design.tileColor.toString()}</Text>
                <Text>length: {info.getValue().design.courtSize.length.toString()}</Text>
                <Text>width: {info.getValue().design.courtSize.width.toString()}</Text>
                <Text>
                  three point radius: {info.getValue().design.courtSize.threePointRadius.toString()}
                </Text>
                <Text>
                  three point line: {info.getValue().design.courtSize.threePointLine.toString()}
                </Text>
                <Text>
                  length of corner: {info.getValue().design.courtSize.lengthOfCorner.toString()}
                </Text>
                <Text>
                  restricted area length:{" "}
                  {info.getValue().design.courtSize.restrictedAreaLength.toString()}
                </Text>
                <Text>
                  restricted area width:{" "}
                  {info.getValue().design.courtSize.restrictedAreaWidth.toString()}
                </Text>
                <Text>
                  side border width: {info.getValue().design.courtSize.sideBorderWidth.toString()}
                </Text>
                <Text>
                  line border width: {info.getValue().design.courtSize.lineBorderWidth.toString()}
                </Text>
                <br />
                <Text fontWeight="bold">Construction Address</Text>
                <Text>
                  {info.getValue().constructionAddress.line1},{" "}
                  {info.getValue().constructionAddress.line2},{" "}
                  {info.getValue().constructionAddress.state}{" "}
                  {info.getValue().constructionAddress.postalCode},{" "}
                  {info.getValue().constructionAddress.country}
                </Text>
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
