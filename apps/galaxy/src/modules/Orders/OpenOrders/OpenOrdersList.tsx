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
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
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
                  click to view quotation here
                </Link>
                <Text>
                  quotation details:{" "}
                  {info
                    .getValue()
                    .quotationDetails.map(
                      (quotationDetail) => `[${quotationDetail.color}, ${quotationDetail.quantity}]`
                    )}
                </Text>
                <br />
                <Text fontWeight="bold">Design Preview</Text>
                <Image src={info.getValue().constructionDraw} alt="design preview alt" />
                <br />
                <Text fontWeight="bold">Court Details</Text>
                <TableContainer>
                  <Table variant="simple">
                    <Tbody>
                      <Tr>
                        <Td paddingLeft="0px">design name</Td>
                        <Td>{info.getValue().design.designName}</Td>
                      </Tr>
                      <Tr>
                        <Td paddingLeft="0px">tile color</Td>
                        <Td>
                          {info
                            .getValue()
                            .design.tileColor.map((tile) => `[${tile.color}, ${tile.location}]`)}
                        </Td>
                      </Tr>
                      <Tr>
                        <Td paddingLeft="0px">length</Td>
                        <Td>{info.getValue().design.courtSize.length.toString()}</Td>
                      </Tr>
                      <Tr>
                        <Td paddingLeft="0px">width</Td>
                        <Td>{info.getValue().design.courtSize.width.toString()}</Td>
                      </Tr>
                      <Tr>
                        <Td paddingLeft="0px">three point radius</Td>
                        <Td>{info.getValue().design.courtSize.threePointRadius.toString()}</Td>
                      </Tr>
                      <Tr>
                        <Td paddingLeft="0px">three point line</Td>
                        <Td>{info.getValue().design.courtSize.threePointLine.toString()}</Td>
                      </Tr>
                      <Tr>
                        <Td paddingLeft="0px">length of corner</Td>
                        <Td>{info.getValue().design.courtSize.lengthOfCorner.toString()}</Td>
                      </Tr>
                      <Tr>
                        <Td paddingLeft="0px">restricted area length</Td>
                        <Td>{info.getValue().design.courtSize.restrictedAreaLength.toString()}</Td>
                      </Tr>
                      <Tr>
                        <Td paddingLeft="0px">side border width</Td>
                        <Td>{info.getValue().design.courtSize.sideBorderWidth.toString()}</Td>
                      </Tr>
                      <Tr>
                        <Td paddingLeft="0px">line border width</Td>
                        <Td>{info.getValue().design.courtSize.lineBorderWidth.toString()}</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
                <br />
                <Text fontWeight="bold">Need To Level Ground</Text>
                <Text>{info.getValue().isNeedLevelGround.toString()}</Text>
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
