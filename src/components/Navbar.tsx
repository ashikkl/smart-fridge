"use client";

import { ThemeToggle } from "./ThemeToggle";
import { signOut, signIn, useSession } from "next-auth/react";
import { Button } from "./ui/Button";
import Link from "next/link";
import Image from "next/image";
import * as Avatar from "@radix-ui/react-avatar";

function Navbar() {
  const { data } = useSession();
  return (
    <div className="  left-0 right-0 top-0 z-50 flex  h-20 items-center justify-between shadow-sm">
      <div className="container mx-auto flex w-full max-w-7xl items-center justify-between">
        <div className="hidden gap-4 md:flex">
          <Link href="/">
            <div className="flex flex-row gap-1">
              <Image
                className="relative z-0 h-8 w-auto"
                src="/refrigerator.png"
                alt="Logo"
                priority={true}
                width={512}
                height={512}
              />
              <div className="blue_gradient text relative text-[1rem] font-extrabold leading-relaxed">
                Smart Fridge App
              </div>
            </div>
          </Link>
          <ThemeToggle />
        </div>
        {/* For mobile view */}
        <div className="flex flex-row gap-2 md:hidden">
          <Link href="/">
            <Image
              className="relative z-0 h-8 w-auto"
              src="/refrigerator.png"
              alt="Logo"
              priority={true}
              width={512}
              height={512}
            />
          </Link>
          <ThemeToggle />
        </div>
        <div className="flex">
          {!data ? (
            <Button
              className="z-0"
              onClick={() => {
                signIn("google", { callbackUrl: "/dashboard/fooditems" });
              }}
            >
              Sign in
            </Button>
          ) : (
            <div className="relative flex flex-row gap-5">
              <Button
                className="z-0"
                variant={"outline"}
                onClick={() => {
                  signOut({ callbackUrl: "/" });
                }}
              >
                Sign out
              </Button>
              <Avatar.Root className="bg-blackA3 inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
                <Avatar.Image
                  className="h-full w-full rounded-[inherit] object-cover"
                  src={data.user.image ? data.user.image : ""}
                  alt={data.user.name ? data.user.name : ""}
                />
                <Avatar.Fallback
                  className="leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium text-slate-900"
                  delayMs={600}
                >
                  {data.user.name
                    ?.split(" ")
                    .map((n: string) => n[0])
                    .join(" ")}
                </Avatar.Fallback>
              </Avatar.Root>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
