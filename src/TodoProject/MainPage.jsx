import AddPage from "./AddPage";
import AddSide from "./AddSide";
import Title from "./Title";
import Modal from "./Modal";
import { useRef } from "react";

function MainPage() {
  const modal = useRef();

  function setDisplay() {
    if (modal.current.open) modal.current.close();
    else modal.current.showModal();
  }
  return (
    <>
      <Modal ref={modal} setDisplay={setDisplay} >모달</Modal>
      <Title></Title>
      <AddSide></AddSide>
    </>
  );
}
export default MainPage;
