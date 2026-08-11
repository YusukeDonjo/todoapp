"use client";

import { motion } from "framer-motion";
import {
  CATEGORIES,
  PRIORITIES,
  PRIORITY_STYLES,
  CATEGORY_STYLES,
  formatDueDate,
  isOverdue,
  type Todo,
} from "@/lib/todo";

type Props = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
  const priorityLabel = PRIORITIES.find((p) => p.value === todo.priority)?.label;
  const categoryLabel = CATEGORIES.find((c) => c.value === todo.category)?.label;
  const overdue = isOverdue(todo);

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 24, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 32 }}
      className="group flex items-start gap-3 rounded-xl px-3 py-2.5 transition hover:bg-emerald-50/60 dark:hover:bg-emerald-950/20"
    >
      <motion.button
        type="button"
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? "未完了に戻す" : "完了にする"}
        whileTap={{ scale: 0.85 }}
        animate={{
          backgroundColor: todo.completed ? "#059669" : "rgba(0,0,0,0)",
          borderColor: todo.completed ? "#059669" : "#d4d4d4",
        }}
        transition={{ duration: 0.2 }}
        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2"
      >
        <motion.svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-3 w-3"
          initial={false}
          animate={{ pathLength: todo.completed ? 1 : 0, opacity: todo.completed ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <path d="M5 13l4 4L19 7" />
        </motion.svg>
      </motion.button>

      <div className="min-w-0 flex-1">
        <span
          className={`block truncate text-sm transition-colors ${
            todo.completed
              ? "text-neutral-400 line-through dark:text-neutral-500"
              : "text-neutral-800 dark:text-neutral-100"
          }`}
        >
          {todo.text}
        </span>
        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
          <span
            className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${PRIORITY_STYLES[todo.priority]}`}
          >
            {priorityLabel}
          </span>
          <span
            className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${CATEGORY_STYLES[todo.category]}`}
          >
            {categoryLabel}
          </span>
          {todo.dueDate && (
            <span
              className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                overdue
                  ? "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-300"
                  : "bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400"
              }`}
            >
              {overdue ? "期限切れ " : "〆 "}
              {formatDueDate(todo.dueDate)}
            </span>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={() => onDelete(todo.id)}
        aria-label="削除"
        className="mt-0.5 shrink-0 rounded-lg p-1 text-neutral-300 opacity-0 transition hover:bg-red-50 hover:text-red-500 group-hover:opacity-100 dark:text-neutral-600 dark:hover:bg-red-950/40"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </motion.li>
  );
}
