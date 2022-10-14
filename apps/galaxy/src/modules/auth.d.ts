type AustraliaState = "ACT" | "NSW" | "QLD" | "VIC" | "NT" | "WA" | "SA";

type BaseInfo = {
  postcode: number | "";
  state: AustraliaState | undefined;
};

type SignUpFormValues = {
  franchise: {
    businessName?: string | "";
    legalEntityName?: string | "";
    abn?: string | "";
    contactNumber?: string | "";
    businessAddress?: string | "";
  } & BaseInfo;
  staff: {
    firstName?: string | "";
    lastName?: string | "";
    email?: string | "";
    password?: string | "";
    confirmPassword?: string | "";
    phoneNumber?: string | "";
    residentialAddress?: string | "";
  } & BaseInfo;
};

type SignUpFormStep = {
  isDisabled?: boolean;
  disableBackButton?: boolean;
  isLastStep?: boolean;
  onBack?: () => void;
  onNext?: () => void;
  fields: Array<FormInputField<SignUpFormValues>>;
};
