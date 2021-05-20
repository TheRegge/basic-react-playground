import React from "react";

const Card = ({ todo }) => {
  return (
    <div>
      {todo.title} -{" "}
      <span style={{ color: "tomato" }}>
        completed: {todo.completed ? "yes" : "no"}
      </span>
    </div>
  );
};

export default Card;
