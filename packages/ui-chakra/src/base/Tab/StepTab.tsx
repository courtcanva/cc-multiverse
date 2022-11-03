import React from "react";
import { Tab, Tabs, TabList, TabPanels } from "@chakra-ui/react";
const stepPannelTitles = ["Step 1", "Step 2", "Step 3"];

type TabProps = {
  formStep: number;
  setFormStep: React.Dispatch<React.SetStateAction<number>>;
};
export const StepTab = ({ formStep, setFormStep }: TabProps) => {
  return (
    <Tabs size="md" isFitted align="center" index={formStep}>
      <TabList border="hidden" margin="10.5px 5px 30.5px 5px">
        {stepPannelTitles.map((_step, index) => (
          <Tab
            _selected={{ borderColor: "#49B785", color: "#2B6CB0" }}
            borderColor="rgba(54, 73, 93, 0.43)"
            color="rgba(43, 108, 176, 0.7)"
            margin="0px 5px"
            key={index}
            isDisabled={index > formStep ? true : false}
            onClick={() => setFormStep(index)}
          >{`Step ${index + 1}`}</Tab>
        ))}
      </TabList>
      <TabPanels>{stepPannelTitles[formStep]}</TabPanels>
    </Tabs>
  );
};
