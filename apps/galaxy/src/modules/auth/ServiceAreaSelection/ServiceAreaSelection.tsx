import { Select, Button, HStack, FormControl, FormLabel } from "@chakra-ui/react";
import { useEffect } from "react";
import SearchBar from "./SearchBar";
import useGetSuburbs, { SuburbArray } from "../../../services/selectServieArea/useGetSuburbs";
import useSelectServiceArea from "../../../services/selectServieArea/useSelectServiceArea";
import usePostServiceArea from "../../../services/selectServieArea/usePostServiceArea";
import { useForm } from "react-hook-form";

interface FormData {
  sscCode: number;
}

type SuburbProps = {
  suburbs: SuburbArray[];
  handleSelect: () => void;
};

const ServiceAreaSelection = () => {
  const { handleSuburbsInfo, suburbs } = useGetSuburbs();
  const { selected, handleSelect } = useSelectServiceArea();
  const { isLoading, handleServiceAreaSubmit } = usePostServiceArea();
  const { handleSubmit } = useForm<FormData>();
  const formSubmit = ({ sscCode }: FormData) => {
    handleServiceAreaSubmit(sscCode);
  };

  useEffect(() => {
    handleSuburbsInfo;
    handleSuburbsInfo();
  }, []);

  return (
    <FormControl onSubmit={handleSubmit(formSubmit)}>
      <FormLabel>Select function</FormLabel>
      <Select>
        <option value="include">Include Area</option>
        {/* <option value="exclude">Exclude Area</option> */}
      </Select>
      <FormLabel marginTop="24px">Search Area</FormLabel>
      <SearchBar suburbs={suburbs} handleSelect={handleSelect} />
      <HStack marginTop="48px">
        <Button type="button" colorScheme="teal" width="50%" isLoading={isLoading}>
          Cancel
        </Button>
        <Button type="submit" colorScheme="teal" width="50%">
          Submit
        </Button>
      </HStack>
    </FormControl>
  );
};

export default ServiceAreaSelection;
