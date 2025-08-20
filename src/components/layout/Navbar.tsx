import React from "react";
import { Search } from "lucide-react";

export function Navbar() {
  return (
    <header className="bg-background/95 backdrop-blur-sm sticky top-0 z-30 border-b">
      <div className="container flex items-center justify-between h-16 px-4">
        <h1 className="text-lg font-semibold tracking-tight lg:text-xl">MarketPulse</h1>
        <div className="hidden md:flex items-center gap-2">
          <Search className="h-4 w-4" />
          <input
            type="search"
            placeholder="Search stocks, indices..."
            className="h-9 w-[200px] lg:w-[280px] bg-transparent border px-2"
          />
        </div>
      </div>
    </header>
  );
}

