// import React from "react";
// import { Tab, Tabs, TabList, TabPanels } from "@chakra-ui/react";

// type SelectProps = {
//   title: string;
//   id: string;
//   placeholder: string;
//   helperText?: string;
//   errorMessage?: string;
//   options: string[];
// } & CKSelectProps;
// export const FormSelect = React.forwardRef(function FormSelect(
//   {
//     isRequired,
//     title,
//     placeholder,
//     helperText,
//     errorMessage,
//     options,
//     ...selectProps
//   }: SelectProps,
//   ref: React.ForwardedRef<HTMLSelectElement>
// ) {
//   return (
//     <FormControl isRequired={isRequired} isInvalid={errorMessage !== undefined}>
//       <FormLabel>{title}</FormLabel>
//       <CKSelect variant="outline" placeholder={placeholder} {...selectProps} ref={ref}>
//         {options.map((option, index) => (
//           <option key={option + index} value={option}>
//             {option}
//           </option>
//         ))}
//       </CKSelect>
//       <FormHelperText>{helperText}</FormHelperText>
//       <FormErrorMessage>{errorMessage}</FormErrorMessage>
//     </FormControl>
//   );
// });

// <Tabs size="md" isFitted align="center" index={formStep}>
//   <TabList border="hidden" margin="10.5px 5px 30.5px 5px">
//     {stepPannelTitles.map((_step, index) => (
//       <Tab
//         _selected={{ borderColor: "#49B785", color: "#2B6CB0" }}
//         borderColor="rgba(54, 73, 93, 0.43)"
//         color="rgba(43, 108, 176, 0.7)"
//         margin="0px 5px"
//         key={index}
//         isDisabled={index > formStep ? true : false}
//         onClick={() => setFormStep(index)}
//       >{`Step ${index + 1}`}</Tab>
//     ))}
//   </TabList>
//   <TabPanels>{stepPannelTitles[formStep]}</TabPanels>
// </Tabs>;
