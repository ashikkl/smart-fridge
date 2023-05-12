import Icons from '@/components/Icons';
import type { Metadata } from 'next';
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = {
  title: "Smart Fridge | Page not found",
  description: "Smart Fridge app to monitor the fridge remotely.",
};

function Notfound() {
    
  return (
    <div className="flex flex-col flex-center min-h-[80vh] items-center">
      <div className="blue_gradient flex flex-center font-bold text-[3rem]">
        Page not Found...
      </div><div className="text text-light text-black/50 dark:text-white/50">
          The page you&apos;re searching for does not exist.
        </div>
      <Link
        className="flex flex-center dark:text-white/75 text-black/75 bg-slate-200/75 hover:bg-slate-300/50 dark:bg-slate-900/75 rounded-full p-4 m-3 dark:hover:bg-slate-900/50"
        href='/'>
        <Icons.ChevronLeft className='mr-2 h-4 w-4' />
        Back to home
      </Link>
    </div>
  );
}

export default Notfound