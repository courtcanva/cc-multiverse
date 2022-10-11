import { useState } from "react";

export interface SelectedArray {
  sscCode: number;
}

export interface SuburbArray {
  value: number;
  label: string;
}

export default function useSelectServiceArea() {
  const [selected, setSelected] = useState<SelectedArray[]>([]);
  const selectedArray: SelectedArray[] = [];

  const handleSelect = (event: SuburbArray) => {
    event.map((e) => {
      selectedArray.push(e.value);
    });
    setSelected(selectedArray);
    console.log(selectedArray);
  };

  return { selected, handleSelect };
}
