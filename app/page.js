"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [taskToBeDone, setTaskToBeDone] = useState("");

  const router = useRouter();

  async function fetchData() {
    try {
      const data = await axios.get("http://localhost:5000/tasks");
      if (data.statusText !== "OK") {
        throw new Error("Data not fetched");
      }
      setTodos(data.data.tasks);
      console.log("data", data.data.tasks);
    } catch {
      (err) => console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handleChange(e) {
    // const { name, value } = e.target;
    // setTaskToBeDone({
    //   ...taskToBeDone,
    //   [name]: value,
    // });
    setTaskToBeDone(e.target.value);
    console.log(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/create", {
        taskToBeDone,
      });
      console.log("res", res);
      if (res.statusText !== "OK") {
        throw new Error("Data not sent");
      }
    } catch {
      (err) => console.log(err);
    } finally {
      setTaskToBeDone("");
      fetchData();
    }

    //checking submit on dev
    // if (input.todo.trim() === "") return;
    // setTodos((prev) => [...prev, input]);
    // setInput({ todo: "" });
    // console.log(todos);
  }

  async function handleDelete(id) {
    try {
      const res = await axios.delete(`http://localhost:5000/tasks/${id}`);
      console.log(res);
      fetchData();
    } catch {
      (err) => console.log(err);
    }
  }

  return (
    <div className="font-sans min-h-screen bg-black text-white flex items-center justify-center p-6 ">
      <main className="w-full max-w-lg h-[600px] flex flex-col bg-black border border-gray-800 rounded-lg ">
        <div className="p-4 border-b border-gray-800">
          <h1 className="text-2xl font-bold mb-3">To-Do List</h1>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              name="taskToBeDone"
              id="taskToBeDone"
              placeholder="Add your task..."
              value={taskToBeDone}
              onChange={handleChange}
              className="flex-1 px-3 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition delay-150 duration-300 hover:scale-110 hover:-translate-y-1 "
            >
              Add
            </button>
          </form>
        </div>

        <div className="flex-1 overflow-y-auto p-4 ">
          <ol className="space-y-3">
            {todos.map((val, i) => (
              <li
                key={i}
                className="flex items-center justify-between bg-gray-900 px-3 py-2 rounded-lg hover:bg-blue-800 transition delay-0 duration-300 hover:scale-105 hover:-translate-y-1 "
              >
                <span>{val.taskToBeDone}</span>
                <div className="flex gap-2">
                  <button
                    className="px-2 py-1 text-sm bg-yellow-500 text-black rounded hover:bg-yellow-600 transition"
                    onClick={() => router.push(`${val._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition"
                    onClick={() => handleDelete(val._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </main>
    </div>

    // <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
    //   <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
    //     <Image
    //       className="dark:invert"
    //       src="/next.svg"
    //       alt="Next.js logo"
    //       width={180}
    //       height={38}
    //       priority
    //     />
    //     <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
    //       <li className="mb-2 tracking-[-.01em]">
    //         Get started by editing{" "}
    //         <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
    //           app/page.js
    //         </code>
    //         .
    //       </li>
    //       <li className="tracking-[-.01em]">
    //         Save and see your changes instantly.
    //       </li>
    //     </ol>

    //     <div className="flex gap-4 items-center flex-col sm:flex-row">
    //       <a
    //         className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
    //         href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         <Image
    //           className="dark:invert"
    //           src="/vercel.svg"
    //           alt="Vercel logomark"
    //           width={20}
    //           height={20}
    //         />
    //         Deploy now
    //       </a>
    //       <a
    //         className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
    //         href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Read our docs
    //       </a>
    //     </div>
    //   </main>
    //   <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
    //     <a
    //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    //       href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="/file.svg"
    //         alt="File icon"
    //         width={16}
    //         height={16}
    //       />
    //       Learn
    //     </a>
    //     <a
    //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    //       href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="/window.svg"
    //         alt="Window icon"
    //         width={16}
    //         height={16}
    //       />
    //       Examples
    //     </a>
    //     <a
    //       className="flex items-center gap-2 hover:underline hover:underline-offset-4"
    //       href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <Image
    //         aria-hidden
    //         src="/globe.svg"
    //         alt="Globe icon"
    //         width={16}
    //         height={16}
    //       />
    //       Go to nextjs.org →
    //     </a>
    //   </footer>
    // </div>
  );
}
