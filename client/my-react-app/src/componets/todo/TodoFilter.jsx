import React, { useEffect, useState } from "react";
import axios from "axios";
import TodoItem from "./TodoItem";

export default function TodoFilter() {
  const [todos, setTodos] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const [showActive, setShowActive] = useState(false)
  const [filteredPost, setFilteredPost] = useState([])
  const [showAll, setShowAll] = useState(true)

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
        filtered = filtered.filter((todo) => todo.completed === true);
      }

      if (showActive) {
        filtered = filtered.filter((todo) => !todo.completed);
      }

      setFilteredPost(filtered);
    };

    filterTodos();
  }, [todos, showCompleted, showActive]);

  const handleCompleted = () => {
    setShowCompleted(true);
    setShowActive(false);
    setShowAll(false)
  };

  const handleActive = () => {
    setShowActive(true);
    setShowCompleted(false);
    setShowAll(false)
  };

  const handleAll = () => {
    setShowAll(true)
    setShowActive(false)
    setShowCompleted(false)
  }

  return (
    <div>
      <div className="flex text-2xl text-blue-500 justify-center py-12">
        <button onClick={handleAll} className={`border-2 border-r-black p-2 h-[50px] w-[250px] ${showAll ? "bg-[#c4c8d0]" : "bg-white"}`}>All Todos</button>
        <button onClick={handleActive} className={`border-2 border-r-black p-2 h-[50px] w-[250px] ${showActive ? "bg-[#c4c8d0] " : "bg-white"}`}>Active Todos</button>
        <button onClick={handleCompleted} className={` p-2 h-[50px] w-[250px] ${showCompleted ? "bg-[#c4c8d0]" : "bg-white"}`}>Completed Todos</button>
      </div>
      <ul>
        {filteredPost && filteredPost.length != 0 ? filteredPost.map((todo) => (
          <li key={todo.id}>{todo.description}</li>
        )) : <p></p>}
      </ul>
    </div>
  );
}
