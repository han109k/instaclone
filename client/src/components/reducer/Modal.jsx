import React, {useEffect} from "react";

const Modal = ({modalContent, closeModal}) => {
  setTimeout(() => {
    closeModal();
  }, 3000);
  return (
    <div>
      <p className="mt-2 font-light text-green-800">{modalContent}</p>
    </div>
  )
}

export default Modal;