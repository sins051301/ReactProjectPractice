import styled from "styled-components";
import { H2 } from "../styles/Tag";
import { Button } from "../styles/Tag";
import { StyledUl } from "../styles/Tag";
import { useContext } from "react";
import { ProjectContext } from "../store/project-store";

const Aside = styled.aside`
  width: 33%;
  padding: 8%;
  padding-bottom: 16%;
  background-color: black;
  color: white;
  border-radius: 20px;
  height: 100%;
`;

const LinkButton = styled.button`
  width: 4rem;
  height: 2rem;
  text-align: left;
  padding: 3%;
  border-radius: 5px;
  margin-top: 10%;
  color: #bcb9b9;
  background-color: #191818;
  &:hover {
    background-color: gray;
    color: white;
  }
`;

function ProjectSidebar() {
  const {StartAddProject, projects, SelectProject} = useContext(ProjectContext);
  return (
    <Aside>
      <H2>Your Projects</H2>

      <StyledUl>
        <Button onClick={StartAddProject}>+ Add Project</Button>
        {projects.map((item) => {
          return (
            <li key={item.id}>
              <LinkButton onClick={() => SelectProject(item.id)}>
                {item.title}
              </LinkButton>
            </li>
          );
        })}
      </StyledUl>
    </Aside>
  );
}
export default ProjectSidebar;
