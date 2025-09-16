import { useState } from "react";
import RadioButton from "../element/RadioButton";
import { GrAddCircle } from "react-icons/gr";
import { BsAlignStart } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { AiOutlineFileSearch } from "react-icons/ai";
import { MdDoneAll } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddTodoPage() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("todo");

  const addHandler = async () => {
    const res = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ title, status }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.status === "success") {
      setTitle("");
      setStatus("todo");
      toast.success("Todo added!");
    }
  };

  return (
    <div className="flex flex-col gap-10 px-14  overflow-y-auto  bg-gradient-to-tr from-pink-100 to-sky-50 pt-8 border-r rounded-xl shadow-lg">
      <h2 className="flex items-center gap-4 text-purple-600 ">
        <GrAddCircle />
        Add New Todo
      </h2>
      {/* title */}
      <div className=" flex items-center gap-2 w-40 ">
        <label htmlFor="title" className=" font-semibold text-gray-800">Title:</label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 block w-full p-2.5 "
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      {/* status */}
      <div>
        <h2 className=" font-semibold text-gray-800">Status:</h2>
        <div className=" flex items-center  gap-6 p-4  py-2 px-2 ">
          <div className=" flex items-center ring-1 ring-purple-300 bg-white shadow-lg hover:transition-all  rounded-lg py-2 px-2 ">
            <BsAlignStart className="text-purple-600" />
            <RadioButton
              status={status}
              setStatus={setStatus}
              value="todo"
              title="Todo"
            ></RadioButton>
          </div>
          <div className=" flex items-center ring-1 ring-purple-300 bg-white shadow-lg  rounded-lg py-2 px-2 ">
            <FiSettings className="text-purple-600" />
            <RadioButton
              status={status}
              setStatus={setStatus}
              value="inProgress"
              title="In Progress"
            ></RadioButton>
          </div>

          <div className=" flex items-center ring-1 ring-purple-300 bg-white shadow-lg  rounded-lg py-2 px-2 ">
            <AiOutlineFileSearch className="text-purple-600" />
            <RadioButton
              status={status}
              setStatus={setStatus}
              value="review"
              title="Review"
            ></RadioButton>
          </div>

          <div className=" flex items-center ring-1 ring-purple-300 bg-white shadow-lg rounded-lg py-2 px-2 ">
            <MdDoneAll className="text-purple-600" />
            <RadioButton
              status={status}
              setStatus={setStatus}
              value="done"
              title="Done"
            ></RadioButton>
          </div>
        </div>
      </div>

       {/*  textDescription  */}
      <div>
        <label
          htmlFor="description"
          className=" font-semibold text-gray-800"
        >
          Description:
        </label>
        <textarea
          // id="description"
          // value={textDescription}
          // onChange={(e) => setTextDescription(e.target.value)}
          className="w-full border rounded-lg p-2 mt-1 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="Write something about yourself..."
        />
      </div>
      <button
        className=" py-3 px-4 w-32 bg-purple-800 text-white rounded-lg font-bold mt-6"
        onClick={addHandler}
      >
        Add
      </button>

      <ToastContainer />
    </div>
  );
}

export default AddTodoPage;
