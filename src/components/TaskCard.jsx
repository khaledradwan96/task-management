// ===== TaskCard.jsx =====
import React from "react";

const TaskCard = ({ task, onEdit, onDelete }) => {
  const { title, description, category } = task;

  return (
    <div className={`task-card ${category}`}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <span className="text-sm px-3 py-1 rounded-full text-white">
          {category}
        </span>
      </div>
      <p className="text-gray-700 mb-4">{description}</p>
      <div className="flex justify-end space-x-2">
        <button
          onClick={onEdit}
          className="text-sm px-3 py-1 rounded-md cursor-pointer text-yellow-600 border border-yellow-600 hover:bg-yellow-600 hover:text-white transition duration-300"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="text-sm px-3 py-1 rounded-md cursor-pointer text-red-600  border border-red-600 hover:bg-red-600 hover:text-white transition duration-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
