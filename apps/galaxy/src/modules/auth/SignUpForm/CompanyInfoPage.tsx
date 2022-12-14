import { useForm } from "react-hook-form";
import { formConfig } from "./formConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import { CompanyInfoFormSchema } from "./SignUpFrom.schema";
import useSignUp from "@src/services/signup/useSignUp";
import {
  FormControl,
  FormInput,
  FormSelect,
  Stack,
  VStack,
  Button,
  FormGroupInput,
} from "@cc/ui-chakra";
import { Dispatch, SetStateAction } from "react";

type SignUpProps = {
  formStep: number;
  setFormStep: React.Dispatch<React.SetStateAction<number>>;
  data: SignUpFormData;
  setData: Dispatch<SetStateAction<SignUpFormData>>;
};
const CompanyInfoPage = ({ formStep, setFormStep, data, setData }: SignUpProps) => {
  const {
    businessName,
    legalEntityName,
    abn,
    contactNumber,
    companyState,
    companyPostcode,
    businessAddress,
  } = formConfig;
  const { register, formState, getValues, handleSubmit } = useForm<CompanyInfoFormData>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: yupResolver(CompanyInfoFormSchema),
  });
  const { checkDuplicateABN } = useSignUp();
  const onSubmit = handleSubmit((formData) => {
    setData({ ...data, ...formData });
    goNextFromStep();
  });
  const goNextFromStep = async () => {
    const isAbnUnique = await checkDuplicateABN(getValues("abn"));
    if (!isAbnUnique) {
      setFormStep(formStep + 1);
    }
  };

  return (
    <FormControl as="form" onSubmit={onSubmit}>
      <VStack spacing="24px" alignItems="stretch">
        <Stack>
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
          <FormGroupInput
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
        </Stack>
        <Button type="submit" variant="secondary" disabled={!formState.isValid}>
          Next
        </Button>
      </VStack>
    </FormControl>
  );
};

export default CompanyInfoPage;
