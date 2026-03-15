import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import type { Status, Priority } from "@/lib/types";

interface FilterBarProps {
  statusFilter: Status | "all";
  onStatusFilter: (s: Status | "all") => void;
  priorityFilter: Priority | "all";
  onPriorityFilter: (p: Priority | "all") => void;
  hasCompleted: boolean;
  onClearCompleted: () => void;
}

export function FilterBar({
  statusFilter,
  onStatusFilter,
  priorityFilter,
  onPriorityFilter,
  hasCompleted,
  onClearCompleted,
}: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
      <Tabs value={statusFilter} onValueChange={(v) => onStatusFilter(v as Status | "all")} className="flex-1">
        <TabsList className="bg-card border border-border h-9">
          <TabsTrigger value="all" className="text-xs px-3 h-7">All</TabsTrigger>
          <TabsTrigger value="pending" className="text-xs px-3 h-7">Pending</TabsTrigger>
          <TabsTrigger value="in-progress" className="text-xs px-3 h-7">In Progress</TabsTrigger>
          <TabsTrigger value="completed" className="text-xs px-3 h-7">Completed</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex items-center gap-2">
        <Select value={priorityFilter} onValueChange={(v) => onPriorityFilter(v as Priority | "all")}>
          <SelectTrigger className="w-[130px] h-9 text-xs bg-card">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>

        {hasCompleted && (
          <Button variant="ghost" size="sm" onClick={onClearCompleted} className="text-xs text-destructive hover:text-destructive">
            <Trash2 className="w-3.5 h-3.5 mr-1" />
            Clear Done
          </Button>
        )}
      </div>
    </div>
  );
}
