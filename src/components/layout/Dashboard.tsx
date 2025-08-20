import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { StatsCard } from "@/components/ui/StatsCard";
import { Wallet2 } from "lucide-react";

export function Dashboard() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setIsSidebarCollapsed((prev) => !prev);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex">
        <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />
        <main className="flex-1 transition-all duration-300">
          <div className="container max-w-full p-4 lg:p-6">
            <h1 className="text-2xl font-bold mb-6">Market Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatsCard
                title="Market Cap"
                value="$0"
                icon={<Wallet2 />}
                className="bg-primary/5"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

