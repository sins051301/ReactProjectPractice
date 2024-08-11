import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function Modal({ children, className = "", open, onClose }) {
  const dialog = useRef();
  useEffect(() => {
    
    //참조값을 지정해 놓기
    const modal = dialog.current;
    if (open) {
      modal.showModal();
    }
    return () => {
      modal.close();

    };
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}

export default Modal;
