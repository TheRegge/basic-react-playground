import "./styles.css";
import ErrorBoundary from "./ErrorBoundary";
import LiveSearch from "./LiveSearch";
import Todos from "./Todos";
import Jokes from "./Jokes";
import Card from "./Card";

import { useEffect, useState } from "react";

const initData = [
  { id: 1, text: "foo" },
  { id: 2, text: "bar" },
  { id: 3, text: "baz" }
];

export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) => {
        const uncomplete = data.filter((todo) => todo.completed === false);
        setTodos(uncomplete);
      });
  }, []);

  return (
    <div className="App">
      <ErrorBoundary>
        {/* MY PRIOR MINI TODO APP */}
        <Todos todos={initData} />
        <hr />

        {/* 
        THE JOKE GENERATOR, USE FETCH API
        ~~ Uses a custom React hook ~~
        */}
        <Jokes />
        <hr />

        {/* A LIVE SEARCH SELECT TOOL.  */}
        <LiveSearch />
        <hr />

        {/* YOUR ASSIGNMENT, SO SORRY WE DID NOT GET TO FINISH! */}
        <h3>Fetch todos from jsonplaceholder.typicode.com</h3>
        {todos.map((todo) => (
          <Card todo={todo} key={todo.id} />
        ))}
      </ErrorBoundary>
    </div>
  );
}
