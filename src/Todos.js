import { nanoid } from "nanoid";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 5rem 25%;
`;
const StyledButton = styled.button`
  margin: 1em 2em;
  padding: 0.5rem 1rem;
  &:hover {
    background-color: lightskyblue;
    border: solid 2px skyblue;
    border-radius: 3px;
  }
`;
const StyledInput = styled.input`
  box-sizing: border-box;
  margin: 2rem 0;
  padding: 1em;
  width: 100%;
  border-radius: 6px;
  border: solid 1px gray;
`;
const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 2rem 0;

  li {
    display: flex;
    flex-direction: row;
    align-items: space-between;
    padding: 0.5em 0;
    border: none;
    border-bottom: solid 1px lightgray;
    &:last-of-type {
      border-bottom: none;
    }
    list-style: none;
    margin: 0;
    width: 100%;
  }
`;

const Todos = (props) => {
  const [todos, setTodos] = useState([]);
  const inputEl = useRef(null);

  useEffect(() => {
    if (props.todos) {
      setTodos(props.todos);
    }
  }, [props.todos]);

  const addTodo = () => {
    const todo = {
      id: nanoid(),
      text: inputEl.current.value
    };
    if (todo.text) {
      setTodos([...todos, todo]);
    }
    inputEl.current.value = "";
  };

  const removeTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const keypressedHandler = (e) => {
    const code = e.keyCode || e.which;
    if (code === 13) {
      addTodo();
    }
  };

  const todosList = todos.map((todo) => (
    <li key={todo.id}>
      <div>{todo.text}</div>
      <div style={{ flexGrow: 1 }}></div>
      <div style={{ alignSelf: "flex-end", color: "red" }}>
        <span style={{ cursor: "pointer" }} onClick={() => removeTodo(todo.id)}>
          ⊖
        </span>
      </div>
    </li>
  ));

  return (
    <Container className="todosContainer">
      <h3 className="todos">Add a todo</h3>
      <p>
        Use your <kbd>enter</kbd> key or click the button below to add a todo.
      </p>
      <StyledInput ref={inputEl} type="text" onKeyUp={keypressedHandler} />
      <br />
      <StyledButton onClick={addTodo}>Add todo</StyledButton>
      <StyledUl className="todosList">{todosList}</StyledUl>
    </Container>
  );
};

export default Todos;
