import React from "react";
import ButtonList from "./Header/ButtonList";
import { useState } from "react";
function Concept({ toStudy, toDo, grade }) {
  return (
    <div>
      <div>Grade: {grade}</div>
      <div>To Do: {toDo}</div>
      <div>To Study: {toStudy}</div>
    </div>
  );
}

const CORE_CONCEPTS = [
  {
    title: "Components",
    description:
      "The core UI building block - compose the user interface by combining multiple components.",
  },
  {
    title: "JSX",
    description:
      "Return (potentially dynamic) HTML(ish) code to define the actual markup that will be rendered.",
  },
  {
    title: "Props",
    description:
      "Make components configurable (and therefore reusable) by passing input data to them.",
  },
  {
    title: "State",
    description:
      "React-managed data which, when changed, causes the component to re-render & the UI to update.",
  },
];

//스프레드 연산자 활용
function Lecture1() {
  const [description, setDescription] = useState(null);

  function randomMessage() {
    let randomNum = Math.floor(Math.random() * 3);
    setDescription(CORE_CONCEPTS[randomNum].description);
  }

  return (
    <div>
      {!description && "empty"}
      {description && description}
      <button onClick={randomMessage}>랜덤 메세지</button>
    </div>
  );
}

export default Lecture1;
