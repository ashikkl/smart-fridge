"use client";

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
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { AddFridge } from "./AddFridge";
import { Trash } from "lucide-react";
import { Button } from "./ui/Button";

interface Fridge {
  id: string;
  fridgeName: string;
}
interface FridgeStore {
  fridge?: string;
  fridges: Fridge[];
  update: (defaultFridge: string) => void;
  addFridge: (id: string, fridgeName: string) => void;
  removeFridge: (id: string) => void;
}

export const useFridgeStore = create<FridgeStore>()(
  devtools(
    persist(
      (set) => ({
        fridge: "",
        fridges: [],
        update: (defaultFridge) => set(() => ({ fridge: defaultFridge })),

        addFridge: (id, fridge) =>
          set((state) => ({
            fridges: [
              ...state.fridges,
              { id: id, fridgeName: fridge } as Fridge,
            ],
          })),

        removeFridge: (id) => {
          set((state) => ({
            fridges: state.fridges.filter((fridge) => fridge.id !== id),
          }));
        },
      }),
      {
        name: "FridgeStore",
      }
    )
  )
);

export function FridgeSelector() {
  let { fridges, fridge, update, removeFridge } = useFridgeStore();

  return (
    <div className="flex flex-row items-center gap-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          removeFridge(fridge ? fridge : "");
        }}
      >
        <Trash width={15} />
      </Button>
      <Select
        /* defaultValue={fridge?.length == 0 ? undefined : fridge} */
        onValueChange={(e) => {
          update(e);
        }}
      >
        <SelectTrigger className="w-[100%] md:w-[180px]">
          <SelectValue placeholder="Select a Fridge" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Connected Fridges</SelectLabel>
            {fridges.map((fridge) => {
              return (
                <SelectItem key={fridge.id} value={fridge.id}>
                  <div className="flex flex-row items-center gap-2">
                    {fridge.fridgeName}
                  </div>
                </SelectItem>
              );
            })}
            <SelectSeparator />
            <SelectLabel>
              <div className="flex flex-row items-center gap-1">
                <AddFridge />
              </div>
            </SelectLabel>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
