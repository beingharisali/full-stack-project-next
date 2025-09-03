"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function page() {
  const [taskToBeDone, setTaskToBeDone] = useState("");
  const params = useParams();
  const router = useRouter();
  console.log(params.id);
  function handleChange(e) {
    // const { name, value } = e.target;
    // setTaskToBeDone({
    //   ...taskToBeDone,
    //   [name]: value,
    // });
    setTaskToBeDone(e.target.value);
    console.log(e.target.value);
  }
  async function submitHandler(e) {
    e.preventDefault();
    const data = await axios.patch(
      `${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/tasks/${params.id}`,
      {
        taskToBeDone,
      }
    );
    console.log(data);
    router.push("/");
  }
  useEffect(() => {
    async function fetchSingleTask() {
      const data = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/tasks/${params.id}`
      );
      console.log(data.data.task);
      setTaskToBeDone(data.data.task.taskToBeDone);
    }
    fetchSingleTask();
  }, []);
  return (
    <div className="p-4 border-b border-gray-800">
      <h1 className="text-2xl font-bold mb-3">Edit List Task</h1>
      <form className="flex gap-2" onSubmit={submitHandler}>
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
          Edit
        </button>
      </form>
    </div>
  );
}

export default page;
