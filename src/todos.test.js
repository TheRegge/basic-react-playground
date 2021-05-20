import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Todos from "./Todos";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterAll(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders an empty list with no props", () => {
  act(() => {
    render(<Todos />, container);
  });

  const todosList = container.querySelector(".todosList");
  // console.log(todosList);
  expect(todosList.children.length).toBe(0);
});

it("renders a list from the props", () => {
  const string1 = "take garbage out";
  const string2 = "do homework";
  act(() => {
    const initData = [
      { id: 1, text: string1 },
      { id: 2, text: string2 }
    ];
    render(<Todos todos={initData} />, container);
  });

  const todosList = container.querySelector(".todosList");
  expect(todosList.children.length).toBe(2);
  expect(todosList.children[0].querySelector("div").textContent).toBe(string1);
  expect(todosList.children[1].querySelector("div").textContent).toBe(string2);
});
