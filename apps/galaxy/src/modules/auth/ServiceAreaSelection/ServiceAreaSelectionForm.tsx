import { Button, HStack, Container, Select } from "@cc/ui-chakra";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import useGetSuburbs from "../../../services/servicearea/useServiceArea";
import { useForm, SubmitHandler } from "react-hook-form";

interface SuburbData {
  sscCode: number;
  suburbName: string;
  state: string;
  postcode: number;
}

interface SuburbGroup {
  label: string;
  value: number;
}

interface FormData {
  suburbs: SuburbGroup[];
}

const defaultValues: FormData = { suburbs: [] };

const ServiceAreaSelection = () => {
  const [options, setOptions] = useState<SuburbGroup[]>([]);
  const suburbsArr: SuburbGroup[] = [];
  const { isLoading, handleServiceAreaSubmit, getSuburbsInfo } = useGetSuburbs();
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues,
  });

  const submit: SubmitHandler<FormData> = (data) => {
    handleServiceAreaSubmit(data);
  };

  useEffect(() => {
    getSuburbsInfo().then((result) => {
      result.map((suburb: SuburbData) => {
        const label = `${suburb.suburbName} ${suburb.state}, ${suburb.postcode}`;
        return suburbsArr.push({ value: suburb.sscCode, label: label });
      });
      setOptions(suburbsArr);
    });
  }, []);

  return (
    <Container as="form" onSubmit={handleSubmit(submit)}>
      <label>Select Area Filter Mode</label>
      <Select>
        <option value="include">Include Mode</option>
        {/* <option value="exclude">Exclude Area</option> */}
      </Select>
      <SearchBar options={options} control={control} />
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
