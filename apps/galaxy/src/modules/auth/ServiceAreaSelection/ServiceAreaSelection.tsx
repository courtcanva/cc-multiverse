import { Button, HStack, Container, Select } from "@cc/ui-chakra";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import getSuburbsInfo from "../../../services/selectServieArea/useGetSuburbs";
import usePostServiceArea from "../../../services/selectServieArea/usePostServiceArea";
import { useForm, SubmitHandler } from "react-hook-form";

interface SuburbGroup {
  label: string;
  value: number;
}

interface FormData {
  suburbs: SuburbGroup[];
}

const defaultValues: FormData = { suburbs: [] };

const ServiceAreaSelection = () => {
  // const { suburbs, setSuburbs } = useState([]);
  const { isLoading, handleServiceAreaSubmit } = usePostServiceArea();
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues,
  });

  const submit: SubmitHandler<FormData> = async (data) => {
    handleServiceAreaSubmit(data);
  };

  useEffect(() => {
    getSuburbsInfo();
    // setSuburbs(getSuburbsInfo());
    console.log(getSuburbsInfo());
  }, []);

  return (
    <Container as="form" onSubmit={handleSubmit(submit)}>
      <label>Select Area Filter Mode</label>
      <Select>
        <option value="include">Include Mode</option>
        <option value="exclude">Exclude Area</option>
      </Select>
      {/* <SearchBar control={control} /> */}
      <HStack marginTop="48px">
        <Button type="button" isLoading={isLoading} variant="secondary" width="50%">
          Back
        </Button>
        <Button type="submit" isLoading={isLoading} variant="primary" width="50%">
          Submit
        </Button>
      </HStack>
    </Container>
  );
};

export default ServiceAreaSelection;
