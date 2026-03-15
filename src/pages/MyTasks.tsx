import { useState, useMemo, useCallback } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTasks } from "@/hooks/use-tasks";
import { toast } from "@/hooks/use-toast";
import { FilterBar } from "@/components/FilterBar";
import { TaskList } from "@/components/TaskList";
import { TaskModal } from "@/components/TaskModal";
import { DeleteConfirm } from "@/components/DeleteConfirm";
import type { Task, Status, Priority } from "@/lib/types";

const MyTasks = () => {
  const { tasks, addTask, updateTask, deleteTask, cycleStatus, clearCompleted, reorder } = useTasks();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | "all">("all");
  const [priorityFilter, setPriorityFilter] = useState<Priority | "all">("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return tasks.filter((t) => {
      if (statusFilter !== "all" && t.status !== statusFilter) return false;
      if (priorityFilter !== "all" && t.priority !== priorityFilter) return false;
      if (search && !t.title.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [tasks, statusFilter, priorityFilter, search]);

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

  const handleClearCompleted = useCallback(() => {
    clearCompleted();
    toast({ title: "Cleared ✨", description: "All completed tasks removed." });
  }, [clearCompleted]);

  const hasCompleted = tasks.some((t) => t.status === "completed");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-display font-bold tracking-tight">My Tasks</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Manage all your tasks</p>
        </div>
        <Button
          onClick={() => { setEditingTask(null); setModalOpen(true); }}
          className="gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          New Task
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks..."
          className="pl-9 bg-card"
        />
      </div>

      {/* Filters */}
      <FilterBar
        statusFilter={statusFilter}
        onStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        onPriorityFilter={setPriorityFilter}
        hasCompleted={hasCompleted}
        onClearCompleted={handleClearCompleted}
      />

      {/* Task List */}
      <TaskList
        tasks={filtered}
        onReorder={reorder}
        onCycleStatus={cycleStatus}
        onEdit={handleEdit}
        onDelete={(id) => setDeleteId(id)}
      />

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

export default MyTasks;
