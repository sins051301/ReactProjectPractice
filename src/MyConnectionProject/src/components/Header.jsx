import LogoImg from "../assets/logo.jpg";
import Modal from "./Modal";
import { useState } from "react";
function Header({ total }) {
  const [modal, setModal] = useState(false);

  function handleModal() {
    setModal((prevState) => !prevState);
  }
  return (
    <div id="main-header">
      <div id="title">
        {" "}
        <img src={LogoImg} alt="title-img" />
        <h1>REATFOOD</h1>
      </div>
      {modal && <Modal></Modal>}
      <button onClick={handleModal}>Cart({total})</button>
    </div>
  );
}
export default Header;
