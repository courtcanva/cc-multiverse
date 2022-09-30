import { useForm } from "react-hook-form";

const australiaStates = [
  {
    value: "NSW",
    label: "NSW",
  },
  {
    value: "VIC",
    label: "VIC",
  },
  {
    value: "ACT",
    label: "ACT",
  },
  {
    value: "QLD",
    label: "QLD",
  },
  {
    value: "SA",
    label: "SA",
  },
  {
    value: "WA",
    label: "WA",
  },
  {
    value: "NT",
    label: "NT",
  },
  {
    value: "TAS",
    label: "TAS",
  },
];

export function useSignUpForm() {
  const formFields: SignUpFormField[][] = [
    [
      {
        name: "email",
        label: "Email",
        placeholder: "Enter email address",
      },
      {
        type: "password",
        name: "password",
        label: "Password",
        placeholder: "Enter password",
      },
      {
        type: "password",
        name: "confirmPassword",
        label: "Confirm Password",
        placeholder: "Confirm Password",
      },
    ],
    [
      {
        name: "businessName",
        label: "Business Name",
        placeholder: "Enter business name",
      },
      {
        name: "abn",
        label: "ABN",
        placeholder: "Enter ABN",
      },
      {
        type: "select",
        name: "state",
        label: "State (AU only)",
        placeholder: "Choose your state",
        options: australiaStates,
      },
      {
        name: "postcode",
        label: "Postcode",
        placeholder: "Enter postcode",
      },
      {
        name: "companyAddress",
        label: "Company Address Details",
        placeholder: "Enter company address details",
      },
    ],
    [
      {
        name: "firstName",
        label: "First Name",
        placeholder: "Enter first name",
      },
      {
        name: "lastName",
        label: "Last Name",
        placeholder: "Enter last name",
      },
      {
        name: "phoneNumber",
        label: "Phone Number",
        placeholder: "Phone No.",
      },
      {
        name: "staffIdType",
        label: "Staff Identification Document",
        placeholder: "Choose type of ID",
      },
      {
        name: "postcode",
        label: "Postcode",
        placeholder: "Enter postcode",
      },
      {
        type: "select",
        name: "state",
        label: "State (AU only)",
        placeholder: "Choose state",
        options: australiaStates,
      },
      {
        name: "residentialAddress",
        label: "Residential Address",
        placeholder: "Enter residential address details",
      },
    ],
  ];

  // Add scheme later

  const checkIfEmailExist = () => {
    // make call to api to check if email exists
    console.log(`${watch("email")} does not exist, i think 🤔`);
  };

  const { control, watch, handleSubmit } = useForm<SignUpFormValues>();

  return { formFields, checkIfEmailExist, control, handleSubmit };
}
