import TodoApp from "@/components/TodoApp";

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center bg-linear-to-b from-emerald-50 to-teal-100 px-4 py-16 dark:from-neutral-950 dark:to-emerald-950/40">
      <TodoApp />
    </div>
  );
}
