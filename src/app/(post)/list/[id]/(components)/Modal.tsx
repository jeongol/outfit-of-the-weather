import React, { SetStateAction } from "react";

interface Props {
  isOpen: boolean;
  children: React.ReactNode;
  onRequestClose: (value: SetStateAction<boolean>) => void;
}

const Modal = ({ isOpen, onRequestClose, children }: Props) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={() => onRequestClose(false)}
    >
      <div className="bg-white rounded-lg shadow-lg p-6" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => onRequestClose(false)} className="absolute top-4 right-4">
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
