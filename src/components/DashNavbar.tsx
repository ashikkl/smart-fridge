"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

function DashNavbar() {
  const pathname = usePathname();
  const hrefs = [
    { title: "Food Items", link: "/dashboard/fooditems" },
    { link: "/dashboard/inside", title: "Inside" },
    { link: "/dashboard/recipes", title: "Recipes" },
  ];

  const makeLink = ({
    title: title,
    link: link,
  }: {
    title: string;
    link: string;
  }) => {
    const isActive = pathname.startsWith(link);

    return (
      <Link
        href={link}
        className={
          isActive
            ? "text-3xl font-extrabold text-slate-800 hover:text-slate-500 dark:text-white dark:hover:text-slate-400"
            : "text-base text-slate-800/50 hover:text-slate-500/50 dark:text-white/50 dark:hover:text-slate-400/50"
        }
        key={title}
      >
        {title}
      </Link>
    );
  };
  return (
    <motion.div
      layout
      transition={{ layout: { duration: 0.5 } }}
      className="relative flex w-[100%] flex-row items-end gap-4 antialiased"
    >
      {hrefs.map((href) => makeLink(href))}
    </motion.div>
  );
}

export default DashNavbar;
