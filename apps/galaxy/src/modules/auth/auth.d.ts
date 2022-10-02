type AustraliaState = "ACT" | "NSW" | "QLD" | "VIC" | "NT" | "WA" | "SA";

type BaseInfo = {
  postcode: number | null;
  state: AustraliaState | null;
};

type SignUpFormValues = {
  franchise: {
    businessName?: string | null;
    legalEntityName?: string | null;
    abn?: string | null;
    contactNumber?: string | null;
    businessAddress?: string | null;
  } & BaseInfo;
  staff: {
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    password?: string | null;
    confirmPassword?: string | null;
    phoneNumber?: string | null;
    residentialAddress?: string | null;
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
