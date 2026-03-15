import { Reorder } from "framer-motion";
import { Inbox } from "lucide-react";
import type { Task } from "@/lib/types";
import { TaskCard } from "./TaskCard";

interface TaskListProps {
  tasks: Task[];
  onReorder: (tasks: Task[]) => void;
  onCycleStatus: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export function TaskList({ tasks, onReorder, onCycleStatus, onEdit, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground animate-fade-in">
        <Inbox className="w-12 h-12 mb-3 opacity-30" />
        <p className="text-sm font-medium">No tasks yet</p>
        <p className="text-xs mt-1">Create a task to get started</p>
      </div>
    );
  }

  return (
    <Reorder.Group axis="y" values={tasks} onReorder={onReorder} className="space-y-2">
      {tasks.map((task) => (
        <Reorder.Item key={task.id} value={task} className="list-none">
          <TaskCard task={task} onCycleStatus={onCycleStatus} onEdit={onEdit} onDelete={onDelete} />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}
