import Input from "./Input";
import styled from "styled-components";
import { Button } from "../styles/Tag";
import { useRef } from "react";
import Modal from "./Modal";
import { H2, StyledP } from "../styles/Tag";

import { useContext } from "react";
import { ProjectContext } from "../store/project-store";

const ProjectDiv = styled.div`
  width: 35rem;
  margin-top: 9rem;
`;

const ProjectMenu = styled.menu`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 2%;
  margin: 1rem;
`;

function NewProject() {
  const {AddProject, CancelAddProject} =useContext(ProjectContext);
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();
  const dialog = useRef();

  function handleSave() {
    let Stitle = title.current.value;
    let Sdescription = description.current.value;
    let SdueDate = dueDate.current.value;
    if (
      Stitle.trim() === "" ||
      Sdescription.trim() === "" ||
      SdueDate.trim() === ""
    ) {
      dialog.current.open();
    } else {
      AddProject({
        title: Stitle,
        description: Sdescription,
        dueDate: SdueDate,
      });
    }
  }
  return (
    <>
      <Modal ref={dialog} buttonLabel="CLOSE">
        <H2>Invalid Input</H2>
        <StyledP>입력 다시해주세요</StyledP>
      </Modal>
      <ProjectDiv>
        <ProjectMenu>
          <li>
            <Button onClick={CancelAddProject}>Cancel</Button>
          </li>
          <li>
            <Button onClick={handleSave}>Save</Button>
          </li>
        </ProjectMenu>
        <div>
          <Input type="text" ref={title} title="Title"></Input>
          <Input ref={description} title="Description" textarea></Input>
          <Input type="date" ref={dueDate} title="Due Date"></Input>
        </div>
      </ProjectDiv>
    </>
  );
}

export default NewProject;
