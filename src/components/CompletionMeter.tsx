"use client";

import { motion } from "framer-motion";

type Props = {
  completed: number;
  total: number;
};

export default function CompletionMeter({ completed, total }: Props) {
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
          完了率
        </span>
        <span className="text-2xl font-semibold tracking-tight text-emerald-600 dark:text-emerald-400">
          {percent}%
        </span>
      </div>
      <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-emerald-100 dark:bg-emerald-950/50">
        <motion.div
          className="h-full rounded-full bg-emerald-500 dark:bg-emerald-400"
          initial={false}
          animate={{ width: `${percent}%` }}
          transition={{ type: "spring", stiffness: 130, damping: 22 }}
        />
      </div>
      <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-500">
        {completed} / {total} 件完了
      </p>
    </div>
  );
}
