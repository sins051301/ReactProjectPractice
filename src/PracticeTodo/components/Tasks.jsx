import styled from "styled-components";
import { H2 } from "../styles/Tag";
import { StyledP } from "../styles/Tag";
import NewTask from "./NewTask";
import { Button } from "../styles/Tag";
import { StyledUl } from "../styles/Tag";
import { StyledLi } from "../styles/Tag";
import { useContext } from "react";
import { ProjectContext } from "../store/project-store";

function Tasks({ tasks}) {
  const { DeleteTask } = useContext(ProjectContext);
  return (
    <section>
      <H2>Tasks</H2>
      {tasks.length === 0 && (
        <StyledP>This Project does not have any tasks yet</StyledP>
      )}

      <NewTask></NewTask>
      {tasks.length > 0 && (
        <StyledUl>
          {tasks.map((task) => (
            <StyledLi key={task.id}>
              <span>{task.text}</span>
              <Button onClick={() => DeleteTask(task.id)}>Clear</Button>
            </StyledLi>
          ))}
        </StyledUl>
      )}
    </section>
  );
}
export default Tasks;
