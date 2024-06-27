import React from "react";
import { useState } from "react";
import Section from "./Section";
import "./ButtonList.css";
const buttons = ["css", "html", "js"];

function ButtonList({ children }) {
  const [message, setMessage] = useState("first");

  function clickEvent(message) {
    setMessage(message);
  }
  //이벤트에 함수 전달할때 clickEvent()로 전달하면 함수가 바로 실행됨
  //따라서 함수명을 전달해주어야 함
  return (
    <Section title={children}>
      {buttons.map((item, index) => (
        <button
          className="button"
          onClick={() => clickEvent(item)}
          type="button"
          key={index}
        >
          {item}
        </button>
      ))}
      {message}
    </Section>
  );
}

export default ButtonList;
