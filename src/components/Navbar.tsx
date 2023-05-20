"use-client"

import { ThemeToggle } from "./ThemeToggle";
import { signOut, signIn, useSession } from "next-auth/react";

function Navbar() {
  /* const { data } = useSession(); */
  return (
    <div className="  left-0 right-0 top-0 z-50 flex  h-20 items-center justify-between shadow-sm">
      <div className="container mx-auto flex w-full max-w-7xl items-center justify-between">
        <div className="hidden gap-4 md:flex">
          <ThemeToggle />
        </div>
        {/* <div className="flex">
          {!data ? (
            <button
              onClick={() => {
                signIn();
              }}
            >
              Sign in
            </button>
          ) : (
            <button
              onClick={() => {
                signOut({ redirect: false });
              }}
            >
              Sign out
            </button>
          )}
        </div> */}

        {/* For mobile view */}
        <div className="md:hidden">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
