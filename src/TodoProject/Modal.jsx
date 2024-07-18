import { forwardRef, useImperativeHandle, useRef } from "react";
import DialogComponent from "./DialogComponent";
const Modal = forwardRef(function Modal({ children, setDisplay }, ref) {
  return (
    <>
      <dialog ref={ref}>
        <h1>{children}</h1>
        <DialogComponent text="Close" setDisplay={setDisplay}></DialogComponent>
      </dialog>
      <DialogComponent text="Open" setDisplay={setDisplay}></DialogComponent>
    </>
  );
});

export default Modal;
