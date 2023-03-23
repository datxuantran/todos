import React from "react";
import ListTasks from "./ListTasks";

const Content = ({ listTasks, handleCheckbox, handleDelete }) => {
  return (
    <main>
      {listTasks.length ? (
        <ListTasks
          listTasks={listTasks}
          handleCheckbox={handleCheckbox}
          handleDelete={handleDelete}
        />
      ) : (
        <p>Your list is empty</p>
      )}
    </main>
  );
};

export default Content;
