"use client";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
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
import { Trash } from "lucide-react";
import { Button } from "./ui/Button";
import useRecipeStore from "./RecipeStore";

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
        update: (defaultFridge) => set({ fridge: defaultFridge }),

        addFridge: (id, fridgeName) =>
          set((state) => ({
            ...state,
            fridges: [...state.fridges, { id: id, fridgeName: fridgeName }],
          })),

        removeFridge: (id) =>
          set((state) => ({
            ...state,
            fridges: state.fridges.filter((fridge) => fridge.id !== id),
          })),
      }),
      {
        name: "FridgeStore",
      }
    )
  )
);

export function FridgeSelector() {
  let { fridges, fridge, update, removeFridge } = useFridgeStore();

  let { updateNeedToUpdate } = useRecipeStore();

  const [id, setId] = React.useState("");
  const [name, setName] = React.useState("");
  const { addFridge } = useFridgeStore();
  async function addFridgeToStore(id: string, name: string): Promise<void> {
    await addFridge(id, name);
  }
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
      </Button>{" "}
      <Dialog>
        <Select
          /* defaultValue={fridge?.length == 0 ? undefined : fridge} */
          onValueChange={(e) => {
            updateNeedToUpdate();
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
                  <DialogTrigger asChild>
                    <button className="flex flex-row items-center">
                      <Plus /> Add a Fridge
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add a Fridge</DialogTitle>
                      <DialogDescription>
                        Link a fridge to your account here. Click save when
                        you&apos;re done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Fridge ID
                        </Label>
                        <Input
                          id="name"
                          onChange={(e) => {
                            setId(e.target.value);
                          }}
                          value={id}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                          Fridge Name
                        </Label>
                        <Input
                          id="username"
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                          value={name}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button
                          onClick={() => {
                            if (id.length != 0 && name.length != 0) {
                              addFridgeToStore(id, name);
                            }
                          }}
                        >
                          Save changes
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </div>
              </SelectLabel>
            </SelectGroup>
          </SelectContent>
        </Select>{" "}
      </Dialog>
    </div>
  );
}
