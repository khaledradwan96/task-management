// ===== App.jsx =====
import React, { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Test Task",
      description: "Task Description",
      category: "Personal",
    },
  ]);
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
        Task Management App
      </h1>
      {tasks.length === 0 ? (
        <p className="text-center text-gray-600">No tasks available</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white shadow p-4 rounded border border-gray-200"
            >
              <h2 className="text-xl font-semibold mb-1">{task.title}</h2>
              <p className="text-gray-700 mb-2">{task.description}</p>
              <span className="text-sm text-blue-600">{task.category}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
