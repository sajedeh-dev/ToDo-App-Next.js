import { RiMastodonLine } from "react-icons/ri";
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";

function Tasks({ data, next, back, fetchTodos }) {
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
        <div key={i._id} className="shadow-xl p-4 bg-gradient-to-tr from-pink-100 to-sky-50  rounded-b-xl mt-4 border-t-2 border-sky-300">
          <span
            className={`w-16 h-2 block mb-7 rounded-lg ${
              statusColors[i.status]
            }`}
          ></span>
          <RiMastodonLine />
          <h4 className="font-medium text-gray-700">{i.title}</h4>
          <div className="flex items-center justify-between mt-4">
            {back ? (
              // <div className="flex  ">
                
                <button
                  className=" flex items-center justify-center gap-2 rounded-xl px-4 py-2  text-yellow-900 bg-yellow-400 ring-2 ring-yellow-700 text-sm font-medium"
                  onClick={() => changeStatus(i._id, back)}
                >
                  <BiLeftArrow  />
                  Back
                </button>
              // </div>
            ) : null}
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
