import React from "react";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

async function Inside() {
  const user = await getServerSession(authOptions);
  if (!user) return notFound();
  let image =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKsPLj2mGwD7UA8kEuX_jHS6q8EymsrhG3JQ&usqp=CAU";
  return (
    <div className="mt-4 flex flex-col items-center">
      {
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt="Inside of fridge" className="w-screen" />
      }
    </div>
  );
}

export default Inside;
