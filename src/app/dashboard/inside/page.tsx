import React from "react";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

async function Inside() {
  const user = await getServerSession(authOptions);
  if (!user) return notFound();
  return <div>Inside</div>;
}

export default Inside;
