import React from 'react'
import { ThemeToggle } from './ThemeToggle'

function Navbar() {
  return (
    <div className="  z-50 top-0 left-0 right-0 h-20  shadow-sm flex items-center justify-between">
      <div className="container max-w-7xl mx-auto w-full flex justify-between items-center">

        <div className="md:hidden">
          <ThemeToggle />
        </div>

        <div className="hidden md:flex gap-4">
          <ThemeToggle />
          
        </div>
      </div>
    </div>
  );
}


export default Navbar