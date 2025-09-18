import { useEffect, useState } from "react";

import { RiArrowDropDownLine } from "react-icons/ri";

import Tasks from "../module/Tasks";
import Counter from "../element/Counter";

function HomePage() {
  const [todos, setTodos] = useState([]);

  const columns = [
    {
      id: "todo",
      title: "TODO",
      next: "inProgress",
      prev: null,
      color: "border-green-600",
      textColor: "text-green-600",
    },
    {
      id: "inProgress",
      title: "In Progress",
      next: "review",
      prev: "todo",
      color: "border-blue-600",
      textColor: "text-blue-600",
    },
    {
      id: "review",
      title: "REVIEW",
      next: "done",
      prev: "inProgress",
      color: "border-orange-600",
      textColor: "text-orange-600",
    },
    {
      id: "done",
      title: "DONE",
      next: null,
      prev: "review",
      color: "border-pink-600",
      textColor: "text-pink-600",
    },
  ];

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await fetch("/api/todos");
    const data = await res.json();
    if (data.status === "success") setTodos(data.data.todos);
  };

  return (
    <div className="grid grid-cols-4 gap-6">
      {columns.map((col) => (
        <div key={col.id} className="flex flex-col gap-4">
          {/* هدر ستون */}
          <div
            className={`flex items-center justify-between border-b-2 ${col.color} bg-inherit`}
          >
            <div className="flex items-center">
              <p className={`py-2 px-4 text-lg font-medium ${col.textColor}`}>
                {col.title}
              </p>
              {/* شمارنده */}
              <Counter count={todos[col.id]?.length || 0} />
            </div>
            <RiArrowDropDownLine className="size-6 text-gray-800" />
          </div>

          {/* لیست تسک‌ها */}
          <div className="bg-white rounded-2xl h-full">
            <Tasks
              data={todos[col.id]}
              fetchTodos={fetchTodos}
              next={col.next}
              back={col.prev}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomePage;

