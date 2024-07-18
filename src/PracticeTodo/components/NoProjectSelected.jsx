import styled from "styled-components";
import noProjectImage from "../no-projects.png";
import { H2 } from "../styles/Tag";
import { Button } from "../styles/Tag";
import { StyledP } from "../styles/Tag";
import { useContext } from "react";
import { ProjectContext } from "../store/project-store";
const StyledDiv = styled.div`
  margin-top: 2rem;
  text-align: center;
  width: 60%;
`;

const ImgWrap = styled.img`
  width: 7rem;
  height: 7rem;
  object-fit: contain;
  justify-content: center;
`;

function NoProjectSelected() {
  const {StartAddProject} = useContext(ProjectContext);
  return (
    <StyledDiv>
      <ImgWrap src={noProjectImage} alt="empty task" />
      <H2>No Project Selected</H2>
      <StyledP>Select a project or get started with a new one</StyledP>
      <StyledP>
        <Button onClick={StartAddProject}>Create new project</Button>
      </StyledP>
    </StyledDiv>
  );
}

export default NoProjectSelected;
