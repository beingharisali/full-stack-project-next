"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function page() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  function handleChange(e) {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
    // setTaskToBeDone(e.target.value);
    console.log(name, value);
  }
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      console.log("is it working");
      console.log("user", user);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/login`,
        user
      );
      console.log("res", res);
      router.push("/");
      if (res.statusText !== "OK") {
        throw new Error("Data not sent");
      }
    } catch {
      (err) => console.log(err);
    } finally {
      setUser({ email: "", password: "" });
    }

    //checking submit on dev
    // if (input.todo.trim() === "") return;
    // setTodos((prev) => [...prev, input]);
    // setInput({ todo: "" });
    // console.log(todos);
  }
  return (
    <div>
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={user.email}
          id="email"
          placeholder="john@gmail.com"
          onChange={handleChange}
          className="flex-1 px-3 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          name="password"
          value={user.password}
          id="password"
          placeholder="********"
          onChange={handleChange}
          className="flex-1 px-3 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition delay-150 duration-300 hover:scale-110 hover:-translate-y-1 "
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default page;
