import { RiMastodonLine } from "react-icons/ri";
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";

import { FaTrashAlt } from "react-icons/fa";

function Tasks({ data, next, back, fetchTodos }) {
  const deleteTodo = async (id) => {
    try {
      const res = await fetch("/api/todos", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.status === "success") {
        fetchTodos(); // بروزرسانی لیست بعد از حذف
      } else {
        console.error("Failed to delete todo:", data.message);
      }
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  const changeStatus = async (id, status) => {
    const res = await fetch("/api/todos", {
      method: "PATCH",
      body: JSON.stringify({ id, status }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.status === "success") fetchTodos();
  };

  const statusColors = {
    todo: "bg-green-500 ",
    inProgress: "bg-blue-500 ",
    review: "bg-orange-500",
    done: "bg-pink-500",
  };

  return (
    <div className="m-0 px-4 ">
      
      {data?.map((i) => (
        <div
          key={i._id}
          className="shadow-xl p-4 bg-gradient-to-tr from-pink-100 to-sky-50  rounded-b-xl mt-4 border-t-2 border-sky-300"
        >
          <div className="flex items-center justify-between mb-7">
          <span
            className={`w-16 h-2 block  rounded-lg ${
              statusColors[i.status]
            }`}
          ></span>
          <button
            className=" text-red-600 rounded-lg text-md"
            onClick={() => deleteTodo(i._id)}
          >
            
            <FaTrashAlt />
          </button>
          </div>
          <RiMastodonLine />
          <h4 className="font-medium text-gray-700">{i.title}</h4>
          <div className="flex items-center justify-between mt-4">
            {back ? (
              // <div className="flex  ">

              <button
                className=" flex items-center justify-center gap-2 rounded-xl px-4 py-2  text-yellow-900 bg-yellow-400 ring-2 ring-yellow-700 text-sm font-medium"
                onClick={() => changeStatus(i._id, back)}
              >
                <BiLeftArrow />
                Back
              </button>
            ) : // </div>
            null}
            {next ? (
              <button
                className="flex items-center justify-center gap-2  rounded-xl px-4 py-2 text-green-900 bg-green-400 ring-2 ring-green-700 text-sm font-medium"
                onClick={() => changeStatus(i._id, next)}
              >
                Next
                <BiRightArrow />
              </button>
            ) : null}
          </div>
          
        </div>
      ))}
    </div>
  );
}

export default Tasks;
