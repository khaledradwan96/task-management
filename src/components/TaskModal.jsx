// ===== TaskModal.jsx =====
import React, { useState, useEffect } from "react";

function TaskModal({ onClose, onAddTask, onEditTask, taskToEdit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setCategory(taskToEdit.category);
    } else {
      setTitle("");
      setDescription("");
      setCategory("");
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !category) {
      setError("Please fill in all fields");
      return;
    }

    const updatedTask = {
      id: taskToEdit ? taskToEdit.id : Date.now(),
      title,
      description,
      category,
    };

    if (taskToEdit) {
      onEditTask(updatedTask);
    } else {
      onAddTask(updatedTask);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 ">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-blue-700 flex items-center justify-between">
          {taskToEdit ? "Edit Task" : "Add New Task"}
          <button
            onClick={onClose}
            className=" text-gray-300 hover:text-gray-400 text-3xl cursor-pointer duration-300"
          >
            x
          </button>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Description"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <select
            name="Category"
            id="Category"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled hidden>
              -- Select a category --
            </option>
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="urgent">Urgent</option>
          </select>

          {error && <p className="text-red-600 mb-3">{error}</p>}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className=" bg-gray-300 hover:bg-gray-400 cursor-pointer duration-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600  hover:bg-blue-700 cursor-pointer duration-300 text-white px-4 py-2 rounded"
            >
              {taskToEdit ? "Save Changes" : "Add New Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;
