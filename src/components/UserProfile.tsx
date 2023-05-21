"use client";
import React from "react";
import * as Avatar from "@radix-ui/react-avatar";
import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@components/ui/DropdownMenu";
import { Button } from "@components/ui/Button";
import Link from "next/link";

function UserProfile() {
  const { data } = useSession();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div >
            <span className="sr-only">User Profile</span>
            <Avatar.Root className="bg-blackA3 inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
              <Avatar.Image
                className="h-full w-full rounded-[inherit] object-cover"
                src={data?.user.image ? data.user.image : ""}
                alt={data?.user.name ? data.user.name : ""}
              />
              <Avatar.Fallback
                className="leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium text-slate-900"
                delayMs={600}
              >
                {data?.user.name
                  ?.split(" ")
                  .map((n: string) => n[0])
                  .join(" ")}
              </Avatar.Fallback>
            </Avatar.Root>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" forceMount>
          <DropdownMenuLabel className=" hover:bg-white dark:hover:bg-slate-900">
            <span>Hi there, {data?.user.name?.split(" ")[0]}</span>
          </DropdownMenuLabel>
          <DropdownMenuItem >
            <Link href="/dashboard">Dashboard</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default UserProfile;
