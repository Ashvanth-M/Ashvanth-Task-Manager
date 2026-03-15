import type { Priority, Status, Category } from "./types";

export const PRIORITY_CONFIG: Record<Priority, { label: string; color: string; bg: string }> = {
  high: { label: "High", color: "text-destructive", bg: "bg-destructive/10" },
  medium: { label: "Medium", color: "text-warning", bg: "bg-warning/10" },
  low: { label: "Low", color: "text-success", bg: "bg-success/10" },
};

export const STATUS_CONFIG: Record<Status, { label: string; color: string; bg: string }> = {
  pending: { label: "Pending", color: "text-warning", bg: "bg-warning/10" },
  "in-progress": { label: "In Progress", color: "text-info", bg: "bg-info/10" },
  completed: { label: "Completed", color: "text-success", bg: "bg-success/10" },
};

export const CATEGORY_CONFIG: Record<Category, { label: string; emoji: string }> = {
  work: { label: "Work", emoji: "💼" },
  personal: { label: "Personal", emoji: "🏠" },
  shopping: { label: "Shopping", emoji: "🛒" },
  health: { label: "Health", emoji: "💪" },
  finance: { label: "Finance", emoji: "💰" },
  education: { label: "Education", emoji: "📚" },
};

export const CATEGORIES: Category[] = ["work", "personal", "shopping", "health", "finance", "education"];
export const PRIORITIES: Priority[] = ["low", "medium", "high"];
