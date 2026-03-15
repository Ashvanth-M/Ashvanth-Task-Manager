export type Priority = "low" | "medium" | "high";
export type Status = "pending" | "in-progress" | "completed";
export type Category = "work" | "personal" | "shopping" | "health" | "finance" | "education";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  category: Category;
  dueDate: string; // ISO string
  createdAt: string;
  order: number;
}
