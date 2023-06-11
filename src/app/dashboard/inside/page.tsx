import React from "react";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import InsideImage from "@/components/InsideImage";

async function Inside() {
  const user = await getServerSession(authOptions);
  if (!user) return notFound();

  return (
    <div className="mt-4 flex flex-col items-center md:pb-10">
      <InsideImage />
    </div>
  );
}

export default Inside;
