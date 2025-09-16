function ProfileForm({
  name,
  lastName,
  password,
  contact,
  position,
  setName,
  setLastName,
  setPassword,
  setContact,
  setPosition,
  onSubmit,
  isEditMode,
}) {
  return (
    <>
      <div className="bg-white ring ring-purple-500 rounded-lg p-6 mt-10 flex flex-col gap-12">
        <div className=" flex items-center gap-4">
          <label htmlFor="name" className=" text-purple-600 font-medium">Name :</label>
          <input
          className=" py-1 ps-4  block w-42 border-gray-200 rounded-lg border-2    focus:outline-none focus:border-purple-300 focus:ring-1 focus:ring-purple-300 disabled:opacity-50 disabled:pointer-events-none"
          
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className=" flex items-center gap-4">
          <label htmlFor="last-name"  className=" text-purple-600 font-medium">Last Name :</label>
          <input
          className=" py-1 ps-4  block w-42 border-gray-200 rounded-lg border-2    focus:outline-none focus:border-purple-300 focus:ring-1 focus:ring-purple-300 disabled:opacity-50 disabled:pointer-events-none"
            id="last-name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        {!isEditMode && (
          <div className=" flex items-center gap-4">
            <label htmlFor="password" className=" text-purple-600 font-medium">Password :</label>
            <input
            className=" py-1 ps-4  block w-42 border-gray-200 rounded-lg border-2    focus:outline-none focus:border-purple-300 focus:ring-1 focus:ring-purple-300 disabled:opacity-50 disabled:pointer-events-none"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        )}
        <div className=" flex items-center gap-4">
          <label htmlFor="contact" className=" text-purple-600 font-medium">Contact :</label>
          <input
          className=" py-1 ps-4  block w-42 border-gray-200 rounded-lg border-2    focus:outline-none focus:border-purple-300 focus:ring-1 focus:ring-purple-300 disabled:opacity-50 disabled:pointer-events-none"
            id="contact"
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </div>

        <div className=" flex items-center gap-4">
          <label htmlFor="position" className=" text-purple-600 font-medium">Position :</label>
          <input
          className=" py-1 ps-4  block w-42 border-gray-200 rounded-lg border-2    focus:outline-none focus:border-purple-300 focus:ring-1 focus:ring-purple-300 disabled:opacity-50 disabled:pointer-events-none"
            id="position"
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </div>
        <button
       className=" py-3 px-4 w-32 bg-purple-800 text-white rounded-lg font-bold mt-6"
       onClick={onSubmit}>{isEditMode ? "Update" : "Submit"}</button>
      </div>
      
    </>
  );
}
export default ProfileForm;
