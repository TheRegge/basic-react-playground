import { useState, useEffect, useCallback } from "react";

function useJokes() {
  const [joke, setJoke] = useState(null);

  const fetchJoke = useCallback(() => {
    fetch("https://official-joke-api.appspot.com/random_joke")
      .then((response) => response.json())
      .then((data) => {
        const fragment = (
          <>
            <div>{data.setup}</div>
            <div style={{ textDecoration: "italics" }}>{data.punchline}</div>
          </>
        );
        setJoke(fragment);
      })
      .catch((err) => {
        setJoke(err.status);
      });
  }, []);

  useEffect(() => {
    fetchJoke();
  }, [fetchJoke]);

  return [joke, fetchJoke];
}

export default useJokes;
