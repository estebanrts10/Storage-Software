import React from "react";
import Link from "next/link";
import { Home, ChevronRight, ChevronLeft } from "lucide-react";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  className?: string;
}

export function Sidebar({ isCollapsed, onToggle, className }: SidebarProps) {
  return (
    <aside className={className}>
      <div className="flex items-center justify-between p-2 border-b">
        <h2 className="font-semibold">Menu</h2>
        <button onClick={onToggle} className="p-1">
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>
      <nav className="p-2 space-y-2">
        <Link href="/" className="flex items-center gap-2">
          <Home className="h-5 w-5" /> Dashboard
        </Link>
      </nav>
    </aside>
  );
}

