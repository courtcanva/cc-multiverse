type SignUpFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  businessName: string;
  abn: string;
  state: string;
  postcode: string;
  companyAddress: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  staffIdType: string;
  staffId: unknown;
  personalPostcode: string;
  personalState: string;
  residentialAddress: string;
};

type SignUpFormField = {
  type?: "text" | "password" | "select";
  name: keyof SignUpFormValues;
  label: string;
  placeholder: string;
  options?: { value: string; label: string }[];
};
