import { useState } from "react";

export default function EditModal({ task, onClose, fetchTodos }) {
  const [form, setForm] = useState({
    title: task.title,
    status: task.status,
  });

  const handleSave = async () => {
    try {
      const res = await fetch("/api/todos", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: task._id, ...form }),
      });

      const data = await res.json();
      if (data.status === "success") {
        fetchTodos(); // لیست رو بروز کن
        onClose(); // بستن مدال
      } else {
        console.error("Failed to update:", data.message);
      }
    } catch (err) {
      console.error("Error updating todo:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-96">
        <h2 className="text-xl text-purple-600 font-semibold mb-4">Edit your Task</h2>

        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full border p-2 rounded mb-4"
        />

        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="w-full border p-2 rounded-md mb-4"
        >
          <option value="todo">Todo</option>
          <option value="inProgress">In Progress</option>
          <option value="review">Review</option>
          <option value="done">Done</option>
        </select>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cansel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
