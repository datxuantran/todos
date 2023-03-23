import apiRequest from "./apiRequest";
import Header from "./Header";
import AddForm from "./AddForm";
import SearchForm from "./SearchForm";
import Content from "./Content";
import Footer from "./Footer";
import { useState, useEffect } from "react";

const { v4: uuidv4 } = require("uuid");

function App() {
  const [listTasks, setListTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = "https://jsonplaceholder.typicode.com/todos/";

  // fetch data for each time the page is reloaded
  useEffect(() => {
    const fetchTasks = async () => {
      // make sure to catch any errors
      // so errors will not bubble out as return result of the callback function
      // which will effect useEffect()
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Did not receive expected data");
        const listTasks = await response.json();

        let cnt = 0; 
        setListTasks(listTasks.filter(task => (task.userId === 1 && cnt++ < 5)));
        setFetchError(null);
      } catch (e) {
        setFetchError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    // call the fetchTasks
    setTimeout(() => fetchTasks(), 1000);
  }, []);

  // ADD NEW TASK 
  const addNewTask = async (taskText) => {
    const newTask = {
      userId: 1,
      id: uuidv4(),
      title: taskText,
      completed: false,
    };
    const updateListTasks = [...listTasks, newTask];
    setListTasks(updateListTasks);

    const postOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8", 
      },
      body: JSON.stringify(newTask),
    };

    const errMsg = await apiRequest(API_URL, postOptions);
    if (errMsg) {
      setFetchError(errMsg);
    }
  };

  const handleCheckbox = async (id) => {
    const updatedListTasks = listTasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setListTasks(updatedListTasks);

    const updatedTask = listTasks.filter((task) => task.id === id)[0];
    const URL = `${API_URL}/${id}`;
    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ completed: !updatedTask.completed }),
    };
    const errMsg = await apiRequest(URL, updateOptions);
    if (errMsg) setFetchError(errMsg);
  };

  const handleDelete = async (id) => {
    const updatedListTasks = listTasks.filter((task) => task.id !== id);
    setListTasks(updatedListTasks);

    const URL = `${API_URL}/${id}`;
    const deleteOptions = {
      method: "DELETE",
    };

    const errMsg = await apiRequest(URL, deleteOptions);
    if (errMsg) setFetchError(errMsg);
  };

  return (
    <div className="app">
      <Header className="header" />

      <div className="form-container">
        <AddForm
          className="addForm"
          newTask={newTask}
          setNewTask={setNewTask}
          addNewTask={addNewTask}
        />
      </div>

      <div className="form-container">
        <SearchForm
          className="searchForm"
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>

      {isLoading && <p style={{ color: "green" }}>Loading tasks...</p>}
      {fetchError && <p style={{ color: "red" }}>{fetchError}</p>}
      {!fetchError && !isLoading && (
        <Content
          className="content"
          listTasks={listTasks.filter((task) =>
            task.title.toLowerCase().includes(searchTerm.toLowerCase())
          )}
          handleCheckbox={handleCheckbox}
          handleDelete={handleDelete}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
