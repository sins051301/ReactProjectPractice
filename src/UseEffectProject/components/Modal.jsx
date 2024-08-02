import { useRef } from "react";
import { createPortal } from "react-dom";
import { useEffect } from "react";
function Modal({ children, open }) {
  //초기 값이 null이기 때문에 오류가 발생한다.
  const dialog = useRef();
  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return createPortal(
    <dialog className="modal" ref={dialog}>
      {open ? children : null}
    </dialog>,
    document.getElementById("modal")
  );
}

export default Modal;
