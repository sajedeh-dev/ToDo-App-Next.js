function ProfileData({ data, setIsEditing }) {
  return (
    <div className="bg-white ring ring-purple-500 rounded-lg p-6 mt-10 flex flex-col gap-12 shadow-lg">
      <div className=" flex items-center gap-4">
        <span className=" text-lg font-medium text-purple-800 ">Email: </span>
        <p className="text-purple-700 text-lg font-semibold ">{data.email}</p>
      </div>
      <div className=" flex items-center gap-4">
        <span className=" text-lg font-medium text-purple-800 ">Name: </span>
        <p className="text-gray-700 ">{data.name}</p>
      </div>
      <div className=" flex items-center gap-4">
        <span className=" text-lg font-medium text-purple-800 ">
          Last Name:{" "}
        </span>
        <p className="text-gray-700 ">{data.lastName}</p>
      </div>
      
      <div className="flex items-center gap-4">
        <span className="text-lg font-medium text-purple-800">Contact: </span>
        <p className="text-gray-700">{data.contact}</p>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-lg font-medium text-purple-800">Position: </span>
        <p className="text-gray-700">{data.position}</p>
      </div>
      <button
        onClick={() => setIsEditing(true)}
       className=" py-3 px-4 w-32 bg-purple-800 text-white rounded-lg font-bold mt-6"
      >
        Edit
      </button>
    </div>
  );
}

export default ProfileData;
