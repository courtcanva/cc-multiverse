import { useForm } from "react-hook-form";
import { formConfig } from "./formConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpFormInfoSchema } from "./SignUpFrom.schema";
import { FormControl, FormInput, FormSelect, Stack, Flex, Button } from "@cc/ui-chakra";
import { StateEnum } from "@src/constants";

interface FormData {
  businessName: string;
  legalEntityName: string;
  abn: string;
  contactNumber: string;
  businessAddress: string;
  companyPostcode: string;
  companyState: StateEnum;
}
const CompanyInfoPage = (props: {
  setFormStep: React.Dispatch<React.SetStateAction<number>>;
  formStep: number;
  data: unknown;
  setData: any;
}) => {
  const { formStep, setFormStep, data, setData } = props;
  const {
    businessName,
    legalEntityName,
    abn,
    contactNumber,
    companyState,
    companyPostcode,
    businessAddress,
  } = formConfig;
  const { register, formState, handleSubmit } = useForm<FormData>({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: yupResolver(SignUpFormInfoSchema),
  });
  const goNextFromStep = () => {
    formStep !== 0 && setFormStep(formStep + 1);
  };
  const goBackFromStep = () => {
    setFormStep(formStep - 1);
  };
  const onSubmit = handleSubmit((formData) => setData({ ...formData, data }));

  return (
    <>
      <FormControl as="form" onSubmit={onSubmit}>
        <FormInput
          {...businessName}
          {...register("businessName")}
          errorMessage={formState.errors.businessName?.message}
        />
        <FormInput
          {...legalEntityName}
          {...register("legalEntityName")}
          errorMessage={formState.errors.legalEntityName?.message}
        />
        <FormInput {...abn} {...register("abn")} errorMessage={formState.errors.abn?.message} />
        <FormInput
          {...contactNumber}
          {...register("contactNumber")}
          errorMessage={formState.errors.contactNumber?.message}
        />
        <FormSelect
          {...companyState}
          {...register("companyState")}
          errorMessage={formState.errors.companyState?.message}
        />
        <FormInput
          {...companyPostcode}
          {...register("companyPostcode")}
          errorMessage={formState.errors.companyPostcode?.message}
        />
        <FormInput
          {...businessAddress}
          {...register("businessAddress")}
          errorMessage={formState.errors.businessAddress?.message}
        />
      </FormControl>
      <Flex direction="column" gap="16px">
        <Stack marginTop="24px" direction={["column", "row"]} justifyContent="stretch">
          <Button flex={1} onClick={goBackFromStep}>
            Back
          </Button>
          <Button
            flex={1}
            type="submit"
            onClick={goNextFromStep}
            variant="secondary"
            disabled={!formState.isValid}
          >
            Next
          </Button>
        </Stack>
      </Flex>
    </>
  );
};

export default CompanyInfoPage;
