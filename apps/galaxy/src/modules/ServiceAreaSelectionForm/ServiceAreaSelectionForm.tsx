import { Button, HStack, Container, Select, FormControl, FormLabel } from "@cc/ui-chakra";
import { useEffect, useState } from "react";
import useServiceArea from "../../services/servicearea/useServiceArea";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Select as ReactSelect, createFilter } from "chakra-react-select";
import { ErrorMessage } from "@hookform/error-message";

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

const defaultValues: FormData = { filterMode: "INCLUDE", suburbs: [] };

const ServiceAreaSelection = () => {
  const [options, setOptions] = useState<SuburbGroup[]>([]);
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const { isLoading, handleServiceAreaSubmit, getSuburbsInfo } = useServiceArea();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues,
  });

  const submit: SubmitHandler<FormData> = (data) => {
    handleServiceAreaSubmit(data);
  };

  const handleInputChange = (e: string) => {
    if (e) {
      setMenuIsOpen(true);
    } else {
      setMenuIsOpen(false);
    }
  };

  const renderErrorMessage = () => {
    return <p style={{ color: "red" }}>Please select at least one option</p>;
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
      <FormControl>
        <FormLabel>Select Area Filter Mode</FormLabel>

        <Select {...register("filterMode")} isRequired={true}>
          <option value="INCLUDE">Include Mode</option>
          <option value="EXCLUDE" disabled>
            Exclude Area
          </option>
        </Select>
        <ErrorMessage errors={errors} name="filterMode" render={renderErrorMessage} />
      </FormControl>
      <FormLabel marginTop="24px">Search Area</FormLabel>
      <Controller
        control={control}
        name="suburbs"
        rules={{ required: true }}
        render={({ field: { onChange, value, name } }) => (
          <FormControl id="reactSelect">
            <ReactSelect
              isMulti
              instanceId="SuburbSelect"
              name={name}
              onChange={onChange}
              value={value}
              options={options}
              errorBorderColor="red.500"
              isInvalid={!!errors.suburbs}
              placeholder={"Please input your address or suburb"}
              components={{ DropdownIndicator: () => null }}
              closeMenuOnSelect={false}
              onInputChange={handleInputChange}
              menuIsOpen={menuIsOpen}
              filterOption={createFilter({ matchFrom: "start" })}
            />
            <ErrorMessage errors={errors} name="suburbs" render={renderErrorMessage} />
          </FormControl>
        )}
      />

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
