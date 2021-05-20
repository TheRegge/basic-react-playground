import React from "react";

import useJokes from "./useJokes";

const Jokes = () => {
  let [joke, fetchJoke] = useJokes();

  const getJoke = () => {
    fetchJoke();
  };

  return (
    <div style={{ margin: "2rem 0" }}>
      <h3 style={{ margin: "1em" }}>Random Dad Joke</h3>
      <div>{joke}</div>
      <button style={{ marginTop: "1em" }} onClick={getJoke}>
        <small>Fetch another joke!!</small>
      </button>
    </div>
  );
};

export default Jokes;
