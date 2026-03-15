import { useTasks } from "@/hooks/use-tasks";
import { StatsBar } from "@/components/StatsBar";
import { TaskList } from "@/components/TaskList";
import { TaskModal } from "@/components/TaskModal";
import { DeleteConfirm } from "@/components/DeleteConfirm";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import { useState, useCallback } from "react";
import type { Task, Priority } from "@/lib/types";

const Index = () => {
  const { tasks, addTask, updateTask, deleteTask, cycleStatus, clearCompleted, reorder } = useTasks();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleSave = useCallback(
    (data: { title: string; description: string; priority: Priority; category: any; dueDate: string }) => {
      if (editingTask) {
        updateTask(editingTask.id, data);
        toast({ title: "Task Updated ✏️", description: `"${data.title}" has been updated.` });
      } else {
        addTask(data);
        toast({ title: "Task Added ✅", description: `"${data.title}" has been created.` });
      }
      setEditingTask(null);
    },
    [editingTask, addTask, updateTask]
  );

  const handleEdit = useCallback((task: Task) => {
    setEditingTask(task);
    setModalOpen(true);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    if (deleteId) {
      const t = tasks.find((t) => t.id === deleteId);
      deleteTask(deleteId);
      toast({ title: "Task Deleted 🗑️", description: t ? `"${t.title}" removed.` : "Task removed." });
      setDeleteId(null);
    }
  }, [deleteId, deleteTask, tasks]);

  // Show only recent 5 tasks on dashboard
  const recentTasks = tasks.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-display font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Stay focused, ship faster</p>
        </div>
        <Button
          onClick={() => { setEditingTask(null); setModalOpen(true); }}
          className="gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          New Task
        </Button>
      </div>

      <StatsBar tasks={tasks} />

      <div>
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">Recent Tasks</h2>
        <TaskList
          tasks={recentTasks}
          onReorder={() => {}}
          onCycleStatus={cycleStatus}
          onEdit={handleEdit}
          onDelete={(id) => setDeleteId(id)}
        />
      </div>

      <TaskModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditingTask(null); }}
        onSave={handleSave}
        editTask={editingTask}
      />

      <DeleteConfirm
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default Index;
