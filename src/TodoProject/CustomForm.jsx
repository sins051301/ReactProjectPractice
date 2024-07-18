import styled from "styled-components";
import { useRef } from "react";

const Styledform = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 50%;
`;

function CustomForm({addList}) {
  const title = useRef();
  const task = useRef();
  
  function handleSubmit(event) {
    event.preventDefault();
    addList({ title: title.current.value, task: task.current.value });
    title.current.value = "";
    task.current.value = "";
  }
  return (
    <Styledform onSubmit={handleSubmit}>
      <input ref={title} type="text" />
      <input ref={task} type="text" />
      <button type="submit">add task</button>
    </Styledform>
  );
}
export default CustomForm;
