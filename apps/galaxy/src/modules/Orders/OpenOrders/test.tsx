import { Checkbox } from "@chakra-ui/react";
import { info } from "next/dist/build/output/log";
import React from "react";

columnHelper.accessor("id", {
  cell: (info) => (
    console.log("info=", info),
      <Checkbox
        isChecked = {checkedItems[info.row.index]}
        onChange = (e) => (
  let list = checkedItems
list[info.row.index] = e.target.checked
setCheckedItems(list)
)
key={info.getValue()}
value={info.getValue()}
/>
)
),
header
  :
  () => (
    <Checkbox
      isChecked={allChecked}
      isIndeterminate={isIndeterminate}
      onChange={(e) => setCheckedItems([e.target.checked, e.target.checked])}
    ></Checkbox>
  ),
}),