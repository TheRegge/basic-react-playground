import React, { useRef, useState } from "react";

import styled from "styled-components";
import countries from "./countries";

const Container = styled.div`
  margin: 5rem 25%;
`;
const StyledInput = styled.input`
  box-sizing: border-box;
  margin: 2rem 0 0 0;
  padding: 1em;
  width: 100%;
  border-radius: 6px;
  border: solid 1px gray;
`;
const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0.2rem 0;
  padding: 0 0.5em;
  border: solid 1px lightgray;

  li {
    display: flex;
    flex-direction: row;
    padding: 0.5em 0;
    border-bottom: solid 1px lightgray;
    &:last-of-type {
      border-bottom: none;
    }
    list-style: none;
    margin: 0;
    width: 100%;
  }
`;

const ListItem = ({ item, fn }) => {
  const { code, name } = item;

  return (
    <li key={code} onClick={() => fn(code, name)}>
      {name}
    </li>
  );
};

const LiveSearch = (props) => {
  const [results, setResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const inputEl = useRef(null);

  const handleSelect = (code, name) => {
    inputEl.current.value = name;
    setSelectedItem({ code, name });
    setResults([]);
  };

  const handleKeyUp = (e) => {
    const code = e.keyCode || e.which;
    const selectTerm = inputEl.current.value;
    setSelectedItem(null);
    const selectResults = countries.filter((item) => {
      const haystack = item.name.trim().toLowerCase();
      const needle = selectTerm.trim().toLowerCase();
      return needle !== "" && haystack.indexOf(needle) > -1;
    });

    if (code === 13) {
      if (selectResults.length > 0) {
        const { code, name } = selectResults[0];
        handleSelect(code, name);
        return;
      }
    }
    setResults(selectResults);
  };

  const resultsList = results.map((result) => (
    <ListItem item={result} fn={handleSelect} />
  ));

  return (
    <Container>
      <h3>Live Countries Search</h3>
      <p>Search amoung {countries.length} countries.</p>
      <p>
        Hit <kbd>enter</kbd> to select the top result.
      </p>

      {selectedItem && (
        <span>
          selected: code: {selectedItem.code}, name: {selectedItem.name}
        </span>
      )}
      <StyledInput ref={inputEl} onKeyUp={handleKeyUp} />
      <StyledUl>{resultsList}</StyledUl>
    </Container>
  );
};

export default LiveSearch;
