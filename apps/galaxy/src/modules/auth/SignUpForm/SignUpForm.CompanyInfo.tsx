import { useForm } from "react-hook-form";
import { formConfig } from "./formConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpFormInfoSchema } from "./SignUpFrom.schema";
import { FormControl, FormInput, FormSelect } from "@cc/ui-chakra";
import { StateEnum } from "@src/constants";

interface FormData {
  businessName: "string";
  legalEntityName: "string";
  abn: "string";
  contactNumber: "string";
  businessAddress: "string";
  companyPostcode: "string";
  companyState: StateEnum;
}
const CompanyInfoPage = (props: {
  setFormStep: React.Dispatch<React.SetStateAction<number>>;
  formStep: number;
}) => {
  const { formStep, setFormStep } = props;
  const {
    businessName,
    legalEntityName,
    abn,
    contactNumber,
    companyState,
    companyPostcode,
    businessAddress,
  } = formConfig;
  const { register, formState } = useForm<FormData>({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: yupResolver(SignUpFormInfoSchema),
  });

  return (
    <FormControl>
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
  );
};

export default CompanyInfoPage;
