import { StyledInput } from "../styles/Tag";
import { Button } from "../styles/Tag";
import { useState } from "react";
import styled from "styled-components";
import { useContext } from "react";
import { ProjectContext } from "../store/project-store";


const TaskWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 3%;
`;
function NewTask() {
  const {AddTask} = useContext(ProjectContext);
  const [text, setText] = useState('');

  function handleChange(e) {
    setText(e.target.value);
  }

  function handelClick() {
    if(text.trim() === '')
      return;
    AddTask(text);
    setText("");
  }

  return (
    <TaskWrap>
      <StyledInput onChange={handleChange} value={text}></StyledInput>
      <Button onClick={handelClick}>task</Button>
    </TaskWrap>
  );
}

export default NewTask;
