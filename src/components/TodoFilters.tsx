"use client";

import { CATEGORIES, PRIORITIES, type Category, type Priority } from "@/lib/todo";

export type CategoryFilter = "all" | Category;
export type PriorityFilter = "all" | Priority;

type Props = {
  category: CategoryFilter;
  priority: PriorityFilter;
  onCategoryChange: (value: CategoryFilter) => void;
  onPriorityChange: (value: PriorityFilter) => void;
};

export default function TodoFilters({
  category,
  priority,
  onCategoryChange,
  onPriorityChange,
}: Props) {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-neutral-100 pt-4 text-xs dark:border-neutral-800">
      <div className="flex items-center gap-1.5">
        <span className="text-neutral-400 dark:text-neutral-500">カテゴリ</span>
        <FilterPill
          active={category === "all"}
          onClick={() => onCategoryChange("all")}
          label="すべて"
        />
        {CATEGORIES.map((c) => (
          <FilterPill
            key={c.value}
            active={category === c.value}
            onClick={() => onCategoryChange(c.value)}
            label={c.label}
          />
        ))}
      </div>

      <div className="flex items-center gap-1.5">
        <span className="text-neutral-400 dark:text-neutral-500">優先度</span>
        <FilterPill
          active={priority === "all"}
          onClick={() => onPriorityChange("all")}
          label="すべて"
        />
        {PRIORITIES.map((p) => (
          <FilterPill
            key={p.value}
            active={priority === p.value}
            onClick={() => onPriorityChange(p.value)}
            label={p.label}
          />
        ))}
      </div>
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-2 py-0.5 font-medium transition ${
        active
          ? "bg-emerald-600 text-white"
          : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
      }`}
    >
      {label}
    </button>
  );
}
