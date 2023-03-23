import React from "react";
import { FaPlus } from "react-icons/fa";

const AddForm = ({ newTask, setNewTask, addNewTask }) => {
  return (
    <form
      className="addForm"
      onSubmit={(e) => {
        e.preventDefault();
        addNewTask(newTask);
      }}
    >
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add Task"
        required
        autoFocus
      />
      <button type="submit" aria-label="Add Item">
        <FaPlus />
      </button>
    </form>
  );
};

export default AddForm;
