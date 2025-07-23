// ===== App.jsx =====
import React, { useState, useEffect } from "react";
import "./App.css";
import TaskModal from "./components/TaskModal";
import TaskCard from "./components/TaskCard";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [showModal, setShowModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  // Filter state
  const [filter, setFilter] = useState("all");
  const filteredTasks =
    filter === "all" ? tasks : tasks.filter((task) => task.category === filter);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    closeModal();
  };

  const handleEditTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    closeModal();
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };
  const openEditModal = (task) => {
    setTaskToEdit(task);
    setShowModal(true);
  };

  const closeModal = () => {
    setTaskToEdit(null);
    setShowModal(false);
  };

  return (
    <div className="h-screen w-full bg-gray-100 py-10 px-6">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex mb-6 justify-between items-center">
          <h1 className="text-3xl font-bold text-center  text-blue-700">
            Task Management App
          </h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600  hover:bg-blue-700 cursor-pointer duration-300 text-white px-4 py-2 rounded"
          >
            Add Task
          </button>
        </div>

        <div className="mb-4 flex justify-end">
          <select
            className="px-4 py-2 border rounded"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>

        {showModal && (
          <TaskModal
            onClose={closeModal}
            onAddTask={handleAddTask}
            onEditTask={handleEditTask}
            taskToEdit={taskToEdit}
          />
        )}

        {filteredTasks.length === 0 ? (
          <p className="text-center text-gray-600">No tasks available</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={() => openEditModal(task)}
                onDelete={() => handleDeleteTask(task.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
