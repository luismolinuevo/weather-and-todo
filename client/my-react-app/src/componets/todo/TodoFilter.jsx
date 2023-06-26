import React, { useEffect, useState } from "react";
import axios from "axios";
import TodoItem from "./TodoItem";

export default function TodoFilter() {
  const [todos, setTodos] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const [showActive, setShowActive] = useState(false)
  const [filteredPost, setFilteredPost] = useState([])

  useEffect(() => {
    const getTodos = async () => {
      try {
        const fetchData = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/todo`
        );
        console.log(fetchData.data);
        setTodos(fetchData.data.fetchTodos);
      } catch (err) {
        console.log("There has been a error trying to fetch data");
      }
    };

    getTodos();
  }, []);

  //filter post if they are completed or not. If I scale I would do this via api calls
  useEffect(() => {
    const filterTodos = () => {
      let filtered = [...todos];
      if (showCompleted) {
        filtered = filtered.filter((todo) => !todo.completed === true);
      }

      if (showActive) {
        filtered = filtered.filter((todo) => todo.completed);
      }

      setFilteredPost(filtered);
    };

    filterTodos();
  }, [todos, showCompleted, showActive]);

  const handleCompleted = () => {
    setShowCompleted(true);
    setShowActive(false);
  };

  const handleActive = () => {
    setShowActive(true);
    setShowCompleted(false);
  };

  const handleAll = () => {
    setShowActive(false)
    setShowCompleted(false)
  }

  return (
    <div>
      <div className="flex gap-8 justify-center">
        <button onClick={handleAll}>Toggle All</button>
        <button onClick={handleCompleted}>Toggle Active</button>
        <button onClick={handleActive}>Toggle Completed</button>
      </div>
      <ul>
        {filteredPost && filteredPost.length != 0 ? filteredPost.map((todo) => (
          <li key={todo.id}>{todo.description}</li>
        )) : <p></p>}
      </ul>
    </div>
  );
}
