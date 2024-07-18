import { useState, useRef } from "react";
import styled from "styled-components";
import CustomForm from "./CustomForm";
import AddPage from "./AddPage";

function AddSide() {
  const [list, setList] = useState([]);


  function addList({ title, task }) {
    setList((prevList) => [
      ...prevList,
      { title: title, description: task, display: false },
    ]);
    console.log(list);
  }
  function handleDisplay(index, event) {
    event.preventDefault();
    setList((prevList) =>
      prevList.map((item, i) =>
        i === index ? { ...item, display: !item.display } : item
      )
    );
  }
  return (
    <>
      <CustomForm addList={addList}></CustomForm>
      <p>
        {list.map((item, index) => (
          <li key={`${item.title}${item.task}`}>
            {item.display ? (
              <>
                <AddPage
                  Title={item.title}
                  description={item.description}
                ></AddPage>
                <button onClick={(e) => handleDisplay(index, e)}>닫기</button>
              </>
            ) : (
              <button onClick={(e) => handleDisplay(index, e)}>이동</button>
            )}
          </li>
        ))}
      </p>
    </>
  );
}

export default AddSide;
