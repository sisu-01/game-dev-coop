"use client";

import { createContext, useState, useContext, ReactNode } from "react";

export const ModalContext = createContext(null
  //{ modalContent: null, openModal: (content) => {}, closeModal: () => {}}
);

const ModalProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => setModalContent(content);
  const closeModal = () => setModalContent(null);

  return (
    <ModalContext.Provider value={{ modalContent, openModal, closeModal }}>
      {children}
      {modalContent && (
        <div className="modal-overlay">
          <div className="modal-content">
            {modalContent}
            <button onClick={closeModal} className="modal-close">✖</button>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
//export const useModal = () => useContext(ModalContext);
