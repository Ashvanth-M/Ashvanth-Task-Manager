import { Moon, Sun, Zap } from "lucide-react";

interface MobileHeaderProps {
  dark: boolean;
  onToggleTheme: () => void;
}

export function MobileHeader({ dark, onToggleTheme }: MobileHeaderProps) {
  return (
    <header className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-border bg-card">
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
    </header>
  );
}
