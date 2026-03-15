import { LayoutDashboard, ListTodo, BarChart3, Moon, Sun, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppSidebarProps {
  dark: boolean;
  onToggleTheme: () => void;
}

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: ListTodo, label: "My Tasks", active: false },
  { icon: BarChart3, label: "Analytics", active: false },
];

export function AppSidebar({ dark, onToggleTheme }: AppSidebarProps) {
  return (
    <aside className="hidden lg:flex flex-col w-[240px] bg-sidebar text-sidebar-foreground border-r border-sidebar-border h-screen sticky top-0">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-6">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-sidebar-primary">
          <Zap className="w-4 h-4 text-sidebar-primary-foreground" />
        </div>
        <span className="font-display text-lg font-bold text-sidebar-primary-foreground tracking-tight">
          FocusFlow
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 mt-2 space-y-0.5">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              item.active
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
            )}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </button>
        ))}
      </nav>

      {/* Theme toggle */}
      <div className="px-3 pb-5">
        <button
          onClick={onToggleTheme}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
        >
          {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          {dark ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </aside>
  );
}
