import { useState, useRef } from "react";
import styled from "styled-components";
import CustomForm from "./CustomForm";
import ContentForm from "./ContentForm";
function AddPage({ Title, description }) {
  const [list, setList] = useState([]);

  function addList({ title, task }) {
    setList((prevList) => [...prevList, { title: title, task: task }]);
    console.log(list);
  }

  function handleClear(event, item) {
    event.preventDefault();
    setList((prevList) => prevList.filter((key) => key !== item));
  }

  return (
    <>
      <div>
        <ContentForm title={Title}> {description}</ContentForm>
      </div>
      <CustomForm addList={addList}></CustomForm>
      <p>
        {list.map((item) => (
          <li key={`${item.title}${item.task}`}>
            <h1>{item.title}</h1>
            {item.task}
            <button onClick={(e) => handleClear(e, item)}>Remove</button>
          </li>
        ))}
      </p>
    </>
  );
}

export default AddPage;
