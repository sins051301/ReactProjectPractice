import styled from "styled-components";
import { StyledP } from "../styles/Tag";
import { H1 } from "../styles/Tag";
import { Button } from "../styles/Tag";
import Tasks from "./Tasks";
import { useContext } from "react";
import { ProjectContext } from "../store/project-store";

const StyledWrap = styled.div`
  width: 35rem;
  margin-top: 3%;
  color: black;
`;
const StyledHeader = styled.header`
  padding-bottom: 2rem;
  margin-bottom: 2rem;
  border-bottom: 2px;
  border-color: gray;
`;

const WrapContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BottomWrap = styled.div`
  padding-top: 3%;
  border-top: 1px solid black;
  width: 100%;
`;

function SelectedProject({ tasks, project }) {
  const {DeleteProject} = useContext(ProjectContext);
  const formmattedDate = new Date(project.dueDate).toLocaleDateString("en-Us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <StyledWrap>
      <StyledHeader>
        <WrapContent>
          <H1>{project.title}</H1>
          <Button onClick={DeleteProject}>Delete</Button>
        </WrapContent>
      </StyledHeader>
      <StyledP>{formmattedDate}</StyledP>
      <StyledP>{project.description}</StyledP>
      <BottomWrap>
        <Tasks tasks={tasks}></Tasks>
      </BottomWrap>
    </StyledWrap>
  );
}

export default SelectedProject;
