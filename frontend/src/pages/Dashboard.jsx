import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const loadTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(Array.isArray(res.data) ? res.data : res.data.tasks || []);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async () => {
    if (!title.trim()) return alert("Enter task title");

    await api.post("/tasks", {
      title,
      description: "Created from website",
      status: "todo"
    });

    setTitle("");
    loadTasks();
  };

  const updateStatus = async (id, status) => {
    await api.put(`/tasks/${id}`, { status });
    loadTasks();
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    loadTasks();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Team Task Manager</h1>

      <div className="bg-white p-5 rounded shadow mb-6">
        <h2 className="text-xl font-bold mb-3">Add Task</h2>

        <div className="flex gap-2">
          <input
            className="border p-2 rounded w-full"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button
            onClick={addTask}
            className="bg-blue-600 text-white px-4 rounded"
          >
            Add
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          Total: {tasks.length}
        </div>

        <div className="bg-white p-4 rounded shadow">
          Done: {tasks.filter((t) => t.status === "done").length}
        </div>

        <div className="bg-white p-4 rounded shadow">
          Pending: {tasks.filter((t) => t.status !== "done").length}
        </div>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold">{task.title}</h3>
              <p className="text-sm text-gray-500">{task.status}</p>
            </div>

            <div className="flex gap-2">
              <select
                className="border p-2 rounded"
                value={task.status}
                onChange={(e) => updateStatus(task._id, e.target.value)}
              >
                <option value="todo">Todo</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>

              <button
                onClick={() => deleteTask(task._id)}
                className="bg-red-500 text-white px-3 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}