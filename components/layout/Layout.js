import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation"; 

import { RiMenu2Fill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";


function Layout({ children }) {
  const { status } = useSession();
  const pathname = usePathname();

  const logOutHandler = () => {
    signOut();
  };

  return (
    <div className="grid grid-cols-[250px,1fr] grid-rows-[auto,1fr] min-h-screen px-4 container m-auto ">
      {/* Header */}
      <header className="bg-gradient-to-tr from-pink-100 to-sky-50 shadow-lg col-span-2 flex justify-between rounded-b-xl items-center p-4">
        <p className="text-2xl font-semibold text-purple-800">Todo App</p>
        {/* serch box */}

        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
            <FaSearch className="size-4 text-gray-500 " />
          </div>
          <input
            className=" py-3 ps-10 pe-4 block w-96 border-gray-200 rounded-lg   focus:outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-300 disabled:opacity-50 disabled:pointer-events-none"
            type="text"
            placeholder="Type Your To Do"/>
          
        </div>

        {status === "authenticated" ? (
          <button onClick={logOutHandler} className="flex items-center gap-2 font-medium text-gray-800">
            Logout <FiLogOut className="size-5 text-purple-900" />
          </button>
        ) : null}
      </header>

      {/* Sidebar */}
      <aside className="px-8  overflow-y-auto mt-4 bg-gradient-to-tr from-pink-100 to-sky-50 pt-8 border-r rounded-xl shadow-lg  ">
        <p className="text-purple-600 text-2xl font-medium ">welcome✨</p>
        <hr className="border-t border-purple-400 my-4" />
       <ul className="space-y-6 font-medium text-gray-600 mt-6">
        <li className={`flex items-center gap-4 ${pathname === "/" ? "text-purple-900 font-bold" : ""}`}>
          <RiMenu2Fill className="size-5" />
          <Link href="/">Todos</Link>
        </li>

        <li className={`flex items-center gap-4 ${pathname === "/add-todo" ? "text-purple-900 font-bold" : ""}`}>
          <IoMdAddCircleOutline className="size-5" />
          <Link href="/add-todo">Add Todo</Link>
        </li>

        <li className={`flex items-center gap-4 ${pathname === "/profile" ? "text-purple-900 font-bold" : ""}`}>
          <CgProfile className="size-5" />
          <Link href="/profile">Profile</Link>
        </li>
      </ul>
        <hr className="border-t border-gray-300 my-4" />
      </aside>

      {/* Main content */}
      <main className="p-4 ">{children}</main>
    </div>
  );
}

export default Layout;
