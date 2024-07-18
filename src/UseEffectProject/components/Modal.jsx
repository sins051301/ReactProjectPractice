import { useRef } from 'react';
import { createPortal } from 'react-dom';

function Modal({ children, open }) {
  const dialog = useRef();
  if(open){
    dialog.current.showModal();
  }
  else{
    dialog.current.close();
  }

  return createPortal(
    <dialog className="modal" ref={dialog}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
};

export default Modal;
