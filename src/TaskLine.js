import React from "react";
import { FaTrashAlt } from "react-icons/fa";

const TaskLine = ({ task, handleCheckbox, handleDelete }) => {
  return (
    <li className="taskLine">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => handleCheckbox(task.id)}
      />
      <label
        style={task.completed ? { textDecoration: "line-through" } : null}
        onDoubleClick={() => handleCheckbox(task.id)}
      >
        {task.title}
      </label>
      <FaTrashAlt onClick={() => handleDelete(task.id)} />
    </li>
  );
};

export default TaskLine;
