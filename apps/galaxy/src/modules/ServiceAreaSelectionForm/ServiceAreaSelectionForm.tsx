import { Button, HStack, Container, Select } from "@cc/ui-chakra";
import { useEffect, useState } from "react";
// import SearchBar from "./SearchBar";
import useGetSuburbs from "../../services/servicearea/useServiceArea";
import { useForm, SubmitHandler } from "react-hook-form";
import { Select as ReactSelect, createFilter } from "chakra-react-select";

import { Controller } from "react-hook-form";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";

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
  filterMode: string;
  suburbs: SuburbGroup[];
}

const defaultValues: FormData = { filterMode: "", suburbs: [] };

const ServiceAreaSelection = () => {
  const [options, setOptions] = useState<SuburbGroup[]>([]);
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const { isLoading, handleServiceAreaSubmit, getSuburbsInfo } = useGetSuburbs();
  const { control, register, handleSubmit } = useForm<FormData>({
    defaultValues,
  });

  const submit: SubmitHandler<FormData> = (data) => {
    handleServiceAreaSubmit(data);
  };

  useEffect(() => {
    getSuburbsInfo().then((result) => {
      const suburbsArr: SuburbGroup[] = (result as Array<SuburbData>)?.map((suburb) => {
        const label = `${suburb.suburbName} ${suburb.state}, ${suburb.postcode}`;
        return { value: suburb.sscCode, label: label };
      });
      setOptions(suburbsArr);
    });
  }, []);

  return (
    <Container as="form" onSubmit={handleSubmit(submit)}>
      {/* <SearchBar options={options} control={control} /> */}
      <FormControl>
        <FormLabel>Select Area Filter Mode</FormLabel>

        <Select
          {...register("filterMode", { required: true })}
          placeholder="Please select filter mode"
        >
          <option value="INCLUDE">Include Mode</option>
          <option value="EXCLUDE" disabled>
            Exclude Area
          </option>
        </Select>

        <FormLabel marginTop="24px">Search Area</FormLabel>
        <Controller
          control={control}
          name="suburbs"
          rules={{ required: "Please select at least one suburb" }}
          render={({ field: { onChange, value, name }, fieldState: { error } }) => (
            <ReactSelect
              isMulti
              instanceId="SuburbSelect"
              name={name}
              onChange={onChange}
              value={value}
              options={options}
              placeholder={"Please input your address or suburb"}
              components={{ DropdownIndicator: () => null }}
              closeMenuOnSelect={false}
              onInputChange={(value) => {
                if (value) {
                  setMenuIsOpen(true);
                } else {
                  setMenuIsOpen(false);
                }
              }}
              menuIsOpen={menuIsOpen}
              filterOption={createFilter({ matchFrom: "start" })}
            />
          )}
        />
        {/* <FormErrorMessage>{error && error.message}</FormErrorMessage> */}
      </FormControl>
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
