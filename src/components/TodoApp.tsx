"use client";

import { useEffect, useState, type FormEvent } from "react";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

const STORAGE_KEY = "todo-app:todos";

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setTodos(JSON.parse(stored));
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

  const addTodo = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    setTodos((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text: trimmed, completed: false },
    ]);
    setText("");
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

  const remaining = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="w-full max-w-md rounded-3xl border border-black/5 bg-white/80 p-8 shadow-xl shadow-indigo-950/5 backdrop-blur-sm dark:border-white/10 dark:bg-neutral-900/80">
      <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
        ToDo リスト
      </h1>
      <p className="mt-1 h-5 text-sm text-neutral-500 dark:text-neutral-400">
        {todos.length > 0 && `残り ${remaining} / ${todos.length} 件`}
      </p>

      <form onSubmit={addTodo} className="mt-4 flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="新しいタスクを入力"
          className="flex-1 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-50 dark:focus:ring-indigo-900"
        />
        <button
          type="submit"
          className="shrink-0 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 active:scale-95"
        >
          追加
        </button>
      </form>

      <ul className="mt-6 flex flex-col gap-1">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-neutral-50 dark:hover:bg-neutral-800/60"
          >
            <button
              type="button"
              onClick={() => toggleTodo(todo.id)}
              aria-label={todo.completed ? "未完了に戻す" : "完了にする"}
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition ${
                todo.completed
                  ? "border-indigo-600 bg-indigo-600"
                  : "border-neutral-300 dark:border-neutral-600"
              }`}
            >
              {todo.completed && (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3 w-3"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
            <span
              className={`flex-1 truncate text-sm ${
                todo.completed
                  ? "text-neutral-400 line-through dark:text-neutral-500"
                  : "text-neutral-800 dark:text-neutral-100"
              }`}
            >
              {todo.text}
            </span>
            <button
              type="button"
              onClick={() => deleteTodo(todo.id)}
              aria-label="削除"
              className="shrink-0 rounded-lg p-1 text-neutral-300 opacity-0 transition hover:bg-red-50 hover:text-red-500 group-hover:opacity-100 dark:text-neutral-600 dark:hover:bg-red-950/40"
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
          </li>
        ))}
      </ul>

      {todos.length === 0 && (
        <p className="mt-8 text-center text-sm text-neutral-400 dark:text-neutral-500">
          タスクはまだありません
        </p>
      )}
    </div>
  );
}
