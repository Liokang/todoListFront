import React, { useState } from "react";
import { Pencil, Trash2, Check, X } from "lucide-react";

function Item({ todos = [], onDelete, onEdit }) {   // ✅ default to empty array
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const startEdit = (todo) => {
    setEditingId(todo._id);
    setEditText(todo.task);
  };

  const saveEdit = (id) => {
    if (editText.trim()) {
      onEdit(id, editText);
    }
    setEditingId(null);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  return (
    <>
      {Array.isArray(todos) && todos.length > 0 ? (   // ✅ guard check
        todos.map((todo) => (
          <li
            key={todo._id}
            className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg mb-2 shadow-sm hover:shadow-md transition"
          >
            {editingId === todo._id ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                autoFocus
              />
            ) : (
              <span className="text-gray-800 font-medium">{todo.task}</span>
            )}

            <div className="flex items-center gap-2 ml-4">
              {editingId === todo._id ? (
                <>
                  <button
                    onClick={() => saveEdit(todo._id)}
                    className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
                    title="Save"
                  >
                    <Check size={18} />
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="p-2 bg-gray-400 text-white rounded-full hover:bg-gray-500 transition"
                    title="Cancel"
                  >
                    <X size={18} />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => startEdit(todo)}
                    className="p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition"
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(todo._id)}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </>
              )}
            </div>
          </li>
        ))
      ) : (
        <p className="text-gray-500 italic">No tasks available</p>   // ✅ fallback
      )}
    </>
  );
}

export default Item;
