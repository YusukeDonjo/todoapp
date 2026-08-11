"use client";

import { useState, type FormEvent } from "react";
import {
  CATEGORIES,
  PRIORITIES,
  type Category,
  type Priority,
} from "@/lib/todo";

type NewTodoInput = {
  text: string;
  priority: Priority;
  category: Category;
  dueDate: string | null;
};

type Props = {
  onAdd: (input: NewTodoInput) => void;
};

const activePriorityClass: Record<Priority, string> = {
  high: "bg-rose-600 text-white",
  medium: "bg-amber-500 text-white",
  low: "bg-slate-500 text-white",
};

const activeCategoryClass: Record<Category, string> = {
  work: "bg-sky-600 text-white",
  private: "bg-violet-600 text-white",
  other: "bg-neutral-600 text-white",
};

export default function TodoForm({ onAdd }: Props) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [category, setCategory] = useState<Category>("work");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd({ text: trimmed, priority, category, dueDate: dueDate || null });
    setText("");
    setDueDate("");
    setPriority("medium");
    setCategory("work");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="新しいタスクを入力"
          className="flex-1 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-50 dark:focus:ring-emerald-900"
        />
        <button
          type="submit"
          className="shrink-0 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700 active:scale-95"
        >
          追加
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1">
          {PRIORITIES.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => setPriority(p.value)}
              className={`rounded-full px-2.5 py-1 text-xs font-medium transition ${
                priority === p.value
                  ? activePriorityClass[p.value]
                  : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => setCategory(c.value)}
              className={`rounded-full px-2.5 py-1 text-xs font-medium transition ${
                category === c.value
                  ? activeCategoryClass[c.value]
                  : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="ml-auto rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-xs text-neutral-600 outline-none transition focus:border-emerald-400 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
        />
      </div>
    </form>
  );
}
