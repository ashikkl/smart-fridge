import React from "react";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import Recipes from "@components/Recipes";
import NoSSR from "@/components/NoSSR";

async function RecipesPage() {
  const user = await getServerSession(authOptions);
  if (!user) return notFound();
  return (
    <div className="flex flex-col items-center justify-start md:pb-10">
      <NoSSR>
        <Recipes />
      </NoSSR>
    </div>
  );
}

export default RecipesPage;
