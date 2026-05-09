import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get("/tasks");
        setTasks(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load tasks");
      }
    };

    fetchTasks();
  }, []);

  const completed = tasks.filter((t) => t.status === "done").length;
  const overdue = tasks.filter(
    (t) => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "done"
  ).length;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded shadow">
          <h2 className="text-gray-500">Total Tasks</h2>
          <p className="text-3xl font-bold">{tasks.length}</p>
        </div>

        <div className="bg-white p-5 rounded shadow">
          <h2 className="text-gray-500">Completed Tasks</h2>
          <p className="text-3xl font-bold">{completed}</p>
        </div>

        <div className="bg-white p-5 rounded shadow">
          <h2 className="text-gray-500">Overdue Tasks</h2>
          <p className="text-3xl font-bold">{overdue}</p>
        </div>
      </div>
    </div>
  );
}