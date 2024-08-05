import LogoImg from "../assets/logo.jpg";
import Modal from "./Modal";
import { useRef } from "react";

function Header({ total, meals, caculMeal }) {
  const modal = useRef();
  function handleModal() {
    if (modal.current) {
      modal.current.open();
    } else {
      modal.current.close();
    }
  }
  return (
    <div id="main-header">
      <div id="title">
        {" "}
        <img src={LogoImg} alt="title-img" />
        <h1>REATFOOD</h1>
      </div>
      <Modal ref={modal} meals={meals} caculMeal={caculMeal}></Modal>
      <button onClick={handleModal}>Cart({total})</button>
    </div>
  );
}
export default Header;
