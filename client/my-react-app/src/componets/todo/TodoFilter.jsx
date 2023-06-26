import React, { useEffect, useState } from "react";
import axios from "axios";
import TodoItem from "./TodoItem";

export default function TodoFilter() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const getTodos = async () => {
      try {
        const fetchData = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/todo`
        );
        console.log(fetchData.data);
        setTodos(fetchData.data);
      } catch (err) {
        console.log("There has been a error trying to fetch data");
      }
    };

    getTodos();
  }, []);

  return <div>TodoFilter</div>;
}
