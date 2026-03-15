import { useState, useMemo, useCallback } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTasks } from "@/hooks/use-tasks";
import { useTheme } from "@/hooks/use-theme";
import { toast } from "@/hooks/use-toast";
import { AppSidebar } from "@/components/AppSidebar";
import { MobileHeader } from "@/components/MobileHeader";
import { StatsBar } from "@/components/StatsBar";
import { FilterBar } from "@/components/FilterBar";
import { TaskList } from "@/components/TaskList";
import { TaskModal } from "@/components/TaskModal";
import { DeleteConfirm } from "@/components/DeleteConfirm";
import type { Task, Status, Priority } from "@/lib/types";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const { dark, toggle } = useTheme();

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar dark={dark} onToggleTheme={toggle} />
      <div className="flex-1 flex flex-col min-h-screen">
        <MobileHeader dark={dark} onToggleTheme={toggle} />
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-4xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
