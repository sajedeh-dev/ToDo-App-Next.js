import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


import Image from "next/image";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") router.replace("/");
  }, [status]);

  const signUpHandler = async () => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
    if (data.status === "success") router.push("/signin");
  };
  return (
    <div className="bg-gradient-to-tr from-pink-100 to-sky-50 shadow-lg flex items-center justify-between p-8 rounded-2xl container m-auto mt-36   h-96 w-[1000px]">
      <div className=" px-8">
        <Image src="/images/signup.png" alt="signup" width={600} height={500}/>
      </div>
      <div className="flex flex-col gap-8 px-28">
        <h3 className="text-xl font-semibold text-purple-800 text-center">
          Sign Up Form
        </h3>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-300 block w-64 p-2.5 "
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-300  block w-64 p-2.5 "
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-purple-400 py-2 w-44 mx-auto flex justify-center items-center rounded-lg font-medium text-white"
          onClick={signUpHandler}
        >
          SignUp
        </button>
        <div className=" flex items-center gap-2 justify-center">
          <p className="text-sm text-gray-600">Have an account?</p>
          <Link className="text-blue-500 text-sm" href="/signin">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
