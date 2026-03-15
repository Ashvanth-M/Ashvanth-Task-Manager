import { useState, useCallback, useEffect } from "react";
import type { Task, Priority, Status, Category } from "@/lib/types";

const STORAGE_KEY = "focusflow-tasks";

function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveTasks(tasks: Task[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = useCallback(
    (data: { title: string; description: string; priority: Priority; category: Category; dueDate: string }) => {
      const task: Task = {
        id: crypto.randomUUID(),
        ...data,
        status: "pending",
        createdAt: new Date().toISOString(),
        order: Date.now(),
      };
      setTasks((prev) => [task, ...prev]);
      return task;
    },
    []
  );

  const updateTask = useCallback((id: string, data: Partial<Omit<Task, "id" | "createdAt">>) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const cycleStatus = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const next: Record<Status, Status> = {
          pending: "in-progress",
          "in-progress": "completed",
          completed: "pending",
        };
        return { ...t, status: next[t.status] };
      })
    );
  }, []);

  const clearCompleted = useCallback(() => {
    setTasks((prev) => prev.filter((t) => t.status !== "completed"));
  }, []);

  const reorder = useCallback((reordered: Task[]) => {
    setTasks(reordered);
  }, []);

  return { tasks, addTask, updateTask, deleteTask, cycleStatus, clearCompleted, reorder };
}
