import { ListTodo, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import type { Task } from "@/lib/types";
import { isAfter, startOfDay } from "date-fns";

interface StatsBarProps {
  tasks: Task[];
}

export function StatsBar({ tasks }: StatsBarProps) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "completed").length;
  const pending = tasks.filter((t) => t.status === "pending").length;
  const today = startOfDay(new Date());
  const overdue = tasks.filter(
    (t) => t.status !== "completed" && t.dueDate && isAfter(today, new Date(t.dueDate))
  ).length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  const stats = [
    { label: "Total", value: total, icon: ListTodo, accent: "text-primary" },
    { label: "Completed", value: completed, icon: CheckCircle2, accent: "text-success" },
    { label: "Pending", value: pending, icon: Clock, accent: "text-warning" },
    { label: "Overdue", value: overdue, icon: AlertTriangle, accent: "text-destructive" },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="bg-card rounded-xl border border-border p-4 animate-fade-in">
            <div className="flex items-center gap-2 mb-2">
              <s.icon className={`w-4 h-4 ${s.accent}`} />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {s.label}
              </span>
            </div>
            <p className={`text-2xl font-display font-bold ${s.accent}`}>{s.value}</p>
          </div>
        ))}
      </div>
      <div className="bg-card rounded-xl border border-border p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Completion
          </span>
          <span className="text-sm font-display font-bold text-primary">{pct}%</span>
        </div>
        <Progress value={pct} className="h-2" />
      </div>
    </div>
  );
}
