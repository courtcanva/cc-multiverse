import {
  DesignInformation,
  QuotationDetails,
  TileColor,
  Orders,
} from "@src/services/orders/useOrders";
import {
  Button,
  Image,
  Text,
  Link,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
  useDisclosure,
} from "@cc/ui-chakra";
import { CellContext } from "@tanstack/react-table";

const Details = (info: CellContext<Orders, DesignInformation>) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  interface Dictionary<T> {
    [Key: string]: T;
  }
  const courtSizes: Dictionary<number> = {
    length: info.getValue().design.courtSize.length,
    width: info.getValue().design.courtSize.width,
    threePointRadius: info.getValue().design.courtSize.threePointRadius,
    threePointLine: info.getValue().design.courtSize.threePointLine,
  };
  return (
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
                  (quotationDetail: QuotationDetails) =>
                    `[${quotationDetail.color}, ${quotationDetail.quantity}] `
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
                        .design.tileColor.map(
                          (tile: TileColor) => `[${tile.color}, ${tile.location}] `
                        )}
                    </Td>
                  </Tr>
                  {Object.keys(courtSizes).map((key, value) => (
                    <Tr key={key}>
                      <Td paddingLeft="0px">{key}</Td>
                      <Td>{value}</Td>
                    </Tr>
                  ))}

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
  );
};

export default Details;
