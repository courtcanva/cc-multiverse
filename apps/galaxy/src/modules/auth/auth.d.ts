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
  username: string;
  password: string;
  confirmPassword: string;
}

interface CompanyInfoFormData {
  businessName: string;
  legalEntityName: string;
  abn: string;
  contactNumber: string;
  businessAddress: string;
  companyPostcode: string;
  companyState: State;
}

interface StaffInfoFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  residentialAddress: string;
  residentialPostcode: string;
  residentialState: State;
}
