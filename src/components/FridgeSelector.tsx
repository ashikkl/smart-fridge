import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

export function FridgeSelector() {
  return (
    <Select>
      <SelectTrigger className="w-[100%] md:w-[180px]">
        <SelectValue placeholder="Select a Fridge" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Connected Fridges</SelectLabel>
          <SelectItem value="Fridge 1">Fridge 1</SelectItem>
          <SelectItem value="add" onClick={()=>{addFridge()}}>Add a Fridge</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
 
const addFridge = () => {
    return ( "to do" );
}
 
export default addFridge;