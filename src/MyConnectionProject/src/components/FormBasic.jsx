import { useRef, useImperativeHandle, forwardRef } from "react";
import { createPortal } from "react-dom";

const FormBasic = forwardRef(function FormBasic({ children, css }, ref) {
  const modal = useRef();
  useImperativeHandle(ref, () => {
    return {
      open() {
        modal.current.showModal();
      },
      close() {
        modal.current.close();
      },
    };
  });

  return createPortal(
    <dialog ref={modal} className={css}>
      {children}
    </dialog>,
    document.getElementById("root")
  );
});

export default FormBasic;
