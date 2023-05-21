import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectSeparator,
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
          <SelectSeparator/>
          <SelectLabel onClick={()=>{addFridge()}}><button>Add a Fridge</button></SelectLabel>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
 //TODO add functionality
const addFridge = () => {
    return ( "to do" );
}
 
export default addFridge;