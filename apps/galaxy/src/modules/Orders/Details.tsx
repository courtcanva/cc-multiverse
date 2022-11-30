import { DesignInformation, TileColor, Order } from "@src/services/orders/useOrders";
import {
  Button,
  Image,
  Text,
  Heading,
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

const Details = (info: CellContext<Order, DesignInformation>) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    quotation,
    quotationDetails,
    constructionDraw,
    design,
    isNeedLevelGround,
    constructionAddress,
  } = info.getValue();
  const constructionAddressDetails = `${constructionAddress.line1}, ${constructionAddress.line2}, ${constructionAddress.state} ${constructionAddress.postalCode}, ${constructionAddress.country}`;
  const courtDesignDetails = [
    { label: "Design name", value: design.designName },
    {
      label: "Tile color",
      value: design.tileColor.map((tile: TileColor) => `[${tile.color}, ${tile.location}] `),
    },
    { label: "Length", value: design.courtSize.length },
    { label: "Width", value: design.courtSize.width },
    { label: "Three point radius", value: design.courtSize.threePointRadius },
    { label: "Three point line", value: design.courtSize.threePointLine },
    { label: "Length of corner", value: design.courtSize.lengthOfCorner },
    { label: "Restricted area length", value: design.courtSize.restrictedAreaLength },
    { label: "Side border width", value: design.courtSize.sideBorderWidth },
    { label: "Line border width", value: design.courtSize.lineBorderWidth },
  ];

  return (
    <>
      <Button onClick={onOpen} variant="secondary">
        View
      </Button>
      <Modal scrollBehavior={"inside"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Order Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading fontSize="17px" marginBottom="5px">
              Quotation
            </Heading>
            <Link href={quotation} color="blue">
              Click to view quotation here
            </Link>
            <Text>
              {"Quotation details: "}
              {quotationDetails.map(
                (quotationDetail) => `[${quotationDetail.color}, ${quotationDetail.quantity}] `
              )}
            </Text>
            <br />
            <Heading fontSize="17px" marginBottom="5px">
              Design Preview
            </Heading>
            <Image src={constructionDraw} alt="design preview alt" />
            <br />
            <Heading fontSize="17px" marginBottom="5px">
              Court Details
            </Heading>
            <TableContainer>
              <Table variant="simple">
                <Tbody>
                  {courtDesignDetails.map(({ label, value }) => (
                    <Tr key={label}>
                      <Td paddingLeft="1px">{label}</Td>
                      <Td>{value}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            <br />
            <Heading fontSize="17px" marginBottom="5px">
              Need To Level Ground
            </Heading>
            <Text>{isNeedLevelGround ? "Yes" : "No"}</Text>
            <br />
            <Heading fontSize="17px" marginBottom="5px">
              Construction Address
            </Heading>
            <Text>{constructionAddressDetails}</Text>
            <br />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Details;
