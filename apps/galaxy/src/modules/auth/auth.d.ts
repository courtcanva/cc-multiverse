type State = "NSW" | "VIC" | "QLD" | "SA" | "WA" | "NT" | "ACT";

type SignUpFormData = {
  username: string | null;
  password: string | null;
  confirmPassword: string | null;
  businessName: string | null;
  legalEntityName: string | null;
  abn: string | null;
  contactNumber: string | null;
  businessAddress: string | null;
  companyPostcode: string | null;
  companyState: string | null;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  residentialAddress: string | null;
  residentialPostcode: string | null;
  residentialState: string | null;
};

interface RegisterInfoFormData {
  username: string | null;
  password: string | null;
  confirmPassword: string | null;
}

interface CompanyInfoFormData {
  businessName: string | null;
  legalEntityName: string | null;
  abn: string | null;
  contactNumber: string | null;
  businessAddress: string | null;
  companyPostcode: string | null;
  companyState: State | null;
}

interface StaffInfoFormData {
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  residentialAddress: string | null;
  residentialPostcode: string | null;
  residentialState: State | null;
}
