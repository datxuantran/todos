import React from "react";
import TaskLine from "./TaskLine";

const ListTasks = ({ listTasks, handleCheckbox, handleDelete }) => {
  return (
    <ul className="listTasks">
      {listTasks.map((task) => {
        return (
          <TaskLine
            key={task.id}
            task={task}
            handleCheckbox={handleCheckbox}
            handleDelete={handleDelete}
          />
        );
      })}
    </ul>
  );
};

export default ListTasks;
