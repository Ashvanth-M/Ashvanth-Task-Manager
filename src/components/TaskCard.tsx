import { Pencil, Trash2, GripVertical, Circle, Clock, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { format, isAfter, startOfDay } from "date-fns";
import type { Task, Status } from "@/lib/types";
import { PRIORITY_CONFIG, STATUS_CONFIG, CATEGORY_CONFIG } from "@/lib/constants";

interface TaskCardProps {
  task: Task;
  onCycleStatus: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const statusIcon: Record<Status, React.ReactNode> = {
  pending: <Circle className="w-5 h-5" />,
  "in-progress": <Clock className="w-5 h-5" />,
  completed: <CheckCircle2 className="w-5 h-5" />,
};

export function TaskCard({ task, onCycleStatus, onEdit, onDelete }: TaskCardProps) {
  const isCompleted = task.status === "completed";
  const today = startOfDay(new Date());
  const isOverdue = !isCompleted && task.dueDate && isAfter(today, new Date(task.dueDate));
  const priority = PRIORITY_CONFIG[task.priority];
  const status = STATUS_CONFIG[task.status];
  const category = CATEGORY_CONFIG[task.category];

  return (
    <div
      className={cn(
        "group bg-card rounded-xl border p-4 transition-all duration-200 hover:shadow-md",
        isOverdue ? "border-destructive/50 bg-destructive/5" : "border-border",
        isCompleted && "opacity-60"
      )}
    >
      <div className="flex items-start gap-3">
        {/* Drag handle */}
        <div className="pt-0.5 cursor-grab text-muted-foreground/40 hover:text-muted-foreground transition-colors">
          <GripVertical className="w-4 h-4" />
        </div>

        {/* Status toggle */}
        <button
          onClick={() => onCycleStatus(task.id)}
          className={cn("pt-0.5 transition-colors", status.color, "hover:opacity-70")}
          title={`Status: ${status.label}. Click to cycle.`}
        >
          {statusIcon[task.status]}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3
              className={cn(
                "font-medium text-sm leading-snug",
                isCompleted && "line-through text-muted-foreground"
              )}
            >
              {task.title}
            </h3>
            {/* Actions (hover reveal on desktop) */}
            <div className="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onEdit(task)}
                className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {task.description && (
            <p className={cn("text-xs text-muted-foreground mt-1 line-clamp-2", isCompleted && "line-through")}>
              {task.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
            <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0 h-5 font-medium border-0", priority.bg, priority.color)}>
              {priority.label}
            </Badge>
            <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0 h-5 font-medium border-0", status.bg, status.color)}>
              {status.label}
            </Badge>
            <span className="text-[10px] text-muted-foreground">
              {category.emoji} {category.label}
            </span>
            {task.dueDate && (
              <span className={cn("text-[10px]", isOverdue ? "text-destructive font-medium" : "text-muted-foreground")}>
                📅 {format(new Date(task.dueDate), "MMM d")}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
