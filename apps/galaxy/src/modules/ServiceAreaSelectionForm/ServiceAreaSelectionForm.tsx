import { Button, HStack, Container, Select, FormControl, FormLabel } from "@cc/ui-chakra";
import { useState } from "react";
import useServiceArea, { FormData } from "../../services/servicearea/useServiceArea";
import { useForm, Controller } from "react-hook-form";
import { Select as ReactSelect, createFilter } from "chakra-react-select";
import { ErrorMessage } from "@hookform/error-message";

const ServiceAreaSelection = () => {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const { isLoading, handleServiceAreaSubmit, options } = useServiceArea();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = handleSubmit((data) => handleServiceAreaSubmit(data));
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

  return (
    <Container as="form" onSubmit={onSubmit}>
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

      <Controller
        control={control}
        name="suburbs"
        rules={{ required: true }}
        render={({ field: { onChange, value, name } }) => (
          <FormControl id="reactSelect" data-testid="serviceAreaSuburbSelect">
            <FormLabel marginTop="24px" htmlFor="suburbs">
              Search Area
            </FormLabel>
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
        <Button type="button" isLoading={isLoading} variant="secondary" flex={1}>
          Back
        </Button>
        <Button type="submit" isLoading={isLoading} variant="primary" flex={1}>
          Submit
        </Button>
      </HStack>
    </Container>
  );
};

export default ServiceAreaSelection;
