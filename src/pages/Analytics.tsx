import { useMemo } from "react";
import { useTasks } from "@/hooks/use-tasks";
import { PRIORITY_CONFIG, STATUS_CONFIG, CATEGORY_CONFIG } from "@/lib/constants";
import type { Priority, Status, Category } from "@/lib/types";
import { isAfter, startOfDay } from "date-fns";

const Analytics = () => {
  const { tasks } = useTasks();

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === "completed").length;
    const pending = tasks.filter((t) => t.status === "pending").length;
    const inProgress = tasks.filter((t) => t.status === "in-progress").length;
    const today = startOfDay(new Date());
    const overdue = tasks.filter(
      (t) => t.status !== "completed" && t.dueDate && isAfter(today, new Date(t.dueDate))
    ).length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    const byPriority: Record<Priority, number> = { low: 0, medium: 0, high: 0 };
    const byCategory: Record<Category, number> = { work: 0, personal: 0, shopping: 0, health: 0, finance: 0, education: 0 };
    const byStatus: Record<Status, number> = { pending: 0, "in-progress": 0, completed: 0 };

    tasks.forEach((t) => {
      byPriority[t.priority]++;
      byCategory[t.category]++;
      byStatus[t.status]++;
    });

    return { total, completed, pending, inProgress, overdue, completionRate, byPriority, byCategory, byStatus };
  }, [tasks]);

  const maxCategory = Math.max(...Object.values(stats.byCategory), 1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold tracking-tight">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Overview of your task performance</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Tasks", value: stats.total, color: "text-primary" },
          { label: "Completed", value: stats.completed, color: "text-success" },
          { label: "In Progress", value: stats.inProgress, color: "text-info" },
          { label: "Overdue", value: stats.overdue, color: "text-destructive" },
        ].map((s) => (
          <div key={s.label} className="bg-card rounded-xl border border-border p-4">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{s.label}</span>
            <p className={`text-3xl font-display font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Completion Rate */}
      <div className="bg-card rounded-xl border border-border p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium">Completion Rate</span>
          <span className="text-2xl font-display font-bold text-primary">{stats.completionRate}%</span>
        </div>
        <div className="w-full h-3 rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${stats.completionRate}%` }}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* By Priority */}
        <div className="bg-card rounded-xl border border-border p-5 space-y-3">
          <h2 className="text-sm font-medium">Tasks by Priority</h2>
          {(["high", "medium", "low"] as Priority[]).map((p) => {
            const config = PRIORITY_CONFIG[p];
            const count = stats.byPriority[p];
            const pct = stats.total > 0 ? (count / stats.total) * 100 : 0;
            return (
              <div key={p} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className={config.color}>{config.label}</span>
                  <span className="text-muted-foreground">{count}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-secondary overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-500 ${config.bg.replace('/10', '/60')}`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* By Status */}
        <div className="bg-card rounded-xl border border-border p-5 space-y-3">
          <h2 className="text-sm font-medium">Tasks by Status</h2>
          {(["pending", "in-progress", "completed"] as Status[]).map((s) => {
            const config = STATUS_CONFIG[s];
            const count = stats.byStatus[s];
            const pct = stats.total > 0 ? (count / stats.total) * 100 : 0;
            return (
              <div key={s} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className={config.color}>{config.label}</span>
                  <span className="text-muted-foreground">{count}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-secondary overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-500 ${config.bg.replace('/10', '/60')}`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* By Category */}
      <div className="bg-card rounded-xl border border-border p-5 space-y-3">
        <h2 className="text-sm font-medium">Tasks by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {(Object.keys(CATEGORY_CONFIG) as Category[]).map((cat) => {
            const config = CATEGORY_CONFIG[cat];
            const count = stats.byCategory[cat];
            return (
              <div key={cat} className="flex items-center gap-2 bg-secondary/50 rounded-lg p-3">
                <span className="text-lg">{config.emoji}</span>
                <div>
                  <p className="text-xs font-medium">{config.label}</p>
                  <p className="text-lg font-display font-bold text-foreground">{count}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
