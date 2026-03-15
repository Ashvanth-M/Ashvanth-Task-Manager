import { Moon, Sun, Zap, LayoutDashboard, ListTodo, BarChart3 } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

interface MobileHeaderProps {
  dark: boolean;
  onToggleTheme: () => void;
}

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", to: "/" },
  { icon: ListTodo, label: "Tasks", to: "/tasks" },
  { icon: BarChart3, label: "Analytics", to: "/analytics" },
];

export function MobileHeader({ dark, onToggleTheme }: MobileHeaderProps) {
  return (
    <header className="lg:hidden border-b border-border bg-card">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary">
            <Zap className="w-3.5 h-3.5 text-primary-foreground" />
          </div>
          <span className="font-display text-base font-bold tracking-tight">FocusFlow</span>
        </div>
        <button
          onClick={onToggleTheme}
          className="p-2 rounded-lg hover:bg-accent transition-colors"
        >
          {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
      <nav className="flex px-2 pb-2 gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )
            }
          >
            <item.icon className="w-3.5 h-3.5" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
