"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { normalizeTodo, type Category, type Priority, type Todo } from "@/lib/todo";
import CompletionMeter from "@/components/CompletionMeter";
import TodoForm from "@/components/TodoForm";
import TodoFilters, {
  type CategoryFilter,
  type PriorityFilter,
} from "@/components/TodoFilters";
import TodoItem from "@/components/TodoItem";

const STORAGE_KEY = "todo-app:todos";

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("all");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setTodos(parsed.map(normalizeTodo).filter((t): t is Todo => t !== null));
        }
      } catch {
        // 破損データは無視する
      }
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
  }, [todos, loaded]);

  const addTodo = (input: {
    text: string;
    priority: Priority;
    category: Category;
    dueDate: string | null;
  }) => {
    setTodos((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        text: input.text,
        completed: false,
        priority: input.priority,
        category: input.category,
        dueDate: input.dueDate,
        createdAt: Date.now(),
      },
    ]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const filteredTodos = useMemo(
    () =>
      todos.filter(
        (todo) =>
          (categoryFilter === "all" || todo.category === categoryFilter) &&
          (priorityFilter === "all" || todo.priority === priorityFilter)
      ),
    [todos, categoryFilter, priorityFilter]
  );

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="w-full max-w-xl rounded-3xl border border-black/5 bg-white/80 p-8 shadow-xl shadow-emerald-950/5 backdrop-blur-sm dark:border-white/10 dark:bg-neutral-900/80">
      <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
        ToDo リスト
      </h1>

      {todos.length > 0 && (
        <div className="mt-4">
          <CompletionMeter completed={completedCount} total={todos.length} />
        </div>
      )}

      <TodoForm onAdd={addTodo} />

      {todos.length > 0 && (
        <TodoFilters
          category={categoryFilter}
          priority={priorityFilter}
          onCategoryChange={setCategoryFilter}
          onPriorityChange={setPriorityFilter}
        />
      )}

      <ul className="mt-4 flex flex-col gap-1">
        <AnimatePresence initial={false}>
          {filteredTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} onDelete={deleteTodo} />
          ))}
        </AnimatePresence>
      </ul>

      {todos.length === 0 && (
        <p className="mt-8 text-center text-sm text-neutral-400 dark:text-neutral-500">
          タスクはまだありません
        </p>
      )}

      {todos.length > 0 && filteredTodos.length === 0 && (
        <p className="mt-8 text-center text-sm text-neutral-400 dark:text-neutral-500">
          条件に一致するタスクはありません
        </p>
      )}
    </div>
  );
}
