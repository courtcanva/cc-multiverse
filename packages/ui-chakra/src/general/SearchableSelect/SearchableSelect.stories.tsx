import { useState } from "react";

import { Meta } from "@storybook/react";
import { SearchableSelect } from "./SearchableSelect";

const defaultOptions = [
  {
    label: "Option 1",
    value: "option1",
  },
  {
    label: "Option 2",
    value: "option2",
  },
  {
    label: "Option 3",
    value: "option3",
  },
];

export default {
  title: "General / Searchable Select",
  component: SearchableSelect,
} as Meta<typeof SearchableSelect>;

export function Default() {
  const [value, setValue] = useState<string | undefined>();

  return <SearchableSelect id="reactSelect" label="Search Area" />;
}

// export function WithError() {
//   const [value, setValue] = useState<string | undefined>();

//   return (
//     <SearchableSelect
//       id="reactSelect"
//       label="Search Area"
//       instanceId="SuburbSelect"
//       name="suburb"
//       onChange={setValue}
//       value={value}
//       options={defaultOptions}
//       isInvalid={false}
//       placeholder="Please input your address or suburb"
//       errorMessage="Wtf is wrong with this"
//     />
//   );
// }
