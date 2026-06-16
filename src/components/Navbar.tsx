"use client";

import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { CodeIcon } from "lucide-react";
import { SignedIn, SignedOut, useClerk, UserButton } from "@clerk/nextjs";
import DasboardBtn from "./DasboardBtn";

function Navbar() {
  const { openSignIn } = useClerk();

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        {/* LEFT SIDE -LOGO */}
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-2xl mr-6 font-mono hover:opacity-80 transition-opacity"
        >
          <CodeIcon className="size-8 text-accent" />
          <span className="text-primary">
            CodeSprint
          </span>
        </Link>

        {/* RIGHT SIDE - ACTIONS */}
        <div className="flex items-center space-x-4 ml-auto">
          <ModeToggle />
          
          <SignedIn>
            <DasboardBtn />
            <UserButton />
          </SignedIn>

          <SignedOut>
            <button 
              onClick={() => openSignIn()} 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
            >
              Sign In
            </button>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;