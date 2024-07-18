import styled from "styled-components";
import { useRef, useImperativeHandle, forwardRef } from "react";
import { createPortal } from "react-dom";
import { Button } from "../styles/Tag";

const StyledModal = styled.dialog`
  width: 50%;
  border-radius: 5px;
  ::shadow &::backdrop {
    background-color: rgba(240, 248, 255, 0.5); /* 50% 투명도 */
  }
`;
const StyledForm = styled.form`
  justify-content: end;
  display: flex;
  width: 100%;
`;

const Modal = forwardRef(function Modal({ children, buttonLabel }, ref) {
  const dialog = useRef();
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });
  return createPortal(
    <StyledModal ref={dialog}>
      {children}
      <StyledForm method="dialog">
        <Button>{buttonLabel}</Button>
      </StyledForm>
    </StyledModal>,
    document.getElementById("modal")
  );
});

export default Modal;
