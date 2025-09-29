import React, { useEffect, useState } from "react";
import axios from "axios";
import Item from "./components/Item";
import { Plus } from "lucide-react";

function Index() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  // Format today's date
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    await axios.post("https://todo-list-backend-psi.vercel.app/todo", { task });
    setTask("");
    fetchData();
  };

  const fetchData = async () => {
    const response = await axios.get("https://todo-list-backend-psi.vercel.app/");
    setTodos(response.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`https://todo-list-backend-psi.vercel.app/delete/${id}`);
    setTodos((prev) => prev.filter((todo) => todo._id !== id));
  };

  const handleEdit = async (id, updatedTask) => {
    await axios.put(`https://todo-list-backend-psi.vercel.app/update/${id}`, { task: updatedTask });
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
        {/* Title + Date */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-blue-700">✅ ATUL RAWAT's  Todo List</h1>
          <p className="text-gray-500 mt-1">{today}</p>
        </div>

        {/* Add Task Form */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 mb-6"
        >
          <input
            type="text"
            placeholder="Add a new task..."
            value={task}
            onChange={handleChange}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            <Plus size={18} />
            Add
          </button>
        </form>

        {/* Todo List */}
        {todos.length > 0 ? (
          <ul className="space-y-2">
            <Item todos={todos} onDelete={handleDelete} onEdit={handleEdit} />
          </ul>
        ) : (
          <p className="text-center text-gray-500">No tasks yet 🎉</p>
        )}
      </div>
    </div>
  );
}

export default Index;
