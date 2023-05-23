"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
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
import React from "react";
import { useFridgeStore } from "./FridgeSelector";

export function AddFridge(): React.JSX.Element {
  const [id, setId] = React.useState("");
  const [name, setName] = React.useState("");
  const { addFridge } = useFridgeStore();
  async function addFridgeToStore(id: string, name: string): Promise<void> {
    await addFridge(id, name);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex flex-row items-center">
          <Plus /> Add a Fridge
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a Fridge</DialogTitle>
          <DialogDescription>
            Link a fridge to your account here. Click save when you&apos;re
            done.
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
    </Dialog>
  );
}
