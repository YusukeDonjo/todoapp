export type Priority = "high" | "medium" | "low";
export type Category = "work" | "private" | "other";

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  category: Category;
  dueDate: string | null;
  createdAt: number;
};

export const PRIORITIES: { value: Priority; label: string }[] = [
  { value: "high", label: "高" },
  { value: "medium", label: "中" },
  { value: "low", label: "低" },
];

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: "work", label: "仕事" },
  { value: "private", label: "プライベート" },
  { value: "other", label: "その他" },
];

export const PRIORITY_STYLES: Record<Priority, string> = {
  high: "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:ring-rose-900/60",
  medium:
    "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:ring-amber-900/60",
  low: "bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-200 dark:bg-slate-800/60 dark:text-slate-300 dark:ring-slate-700",
};

export const CATEGORY_STYLES: Record<Category, string> = {
  work: "bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-200 dark:bg-sky-950/40 dark:text-sky-300 dark:ring-sky-900/60",
  private:
    "bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-200 dark:bg-violet-950/40 dark:text-violet-300 dark:ring-violet-900/60",
  other:
    "bg-neutral-100 text-neutral-600 ring-1 ring-inset ring-neutral-200 dark:bg-neutral-800/60 dark:text-neutral-300 dark:ring-neutral-700",
};

export function normalizeTodo(raw: unknown): Todo | null {
  if (typeof raw !== "object" || raw === null) return null;
  const r = raw as Record<string, unknown>;
  if (typeof r.id !== "string" || typeof r.text !== "string") return null;

  const priority: Priority =
    r.priority === "high" || r.priority === "medium" || r.priority === "low"
      ? r.priority
      : "medium";
  const category: Category =
    r.category === "work" || r.category === "private" || r.category === "other"
      ? r.category
      : "other";

  return {
    id: r.id,
    text: r.text,
    completed: Boolean(r.completed),
    priority,
    category,
    dueDate: typeof r.dueDate === "string" ? r.dueDate : null,
    createdAt: typeof r.createdAt === "number" ? r.createdAt : Date.now(),
  };
}

export function isOverdue(todo: Todo): boolean {
  if (!todo.dueDate || todo.completed) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(todo.dueDate) < today;
}

export function formatDueDate(dueDate: string): string {
  const [, month, day] = dueDate.split("-");
  return `${Number(month)}/${Number(day)}`;
}
