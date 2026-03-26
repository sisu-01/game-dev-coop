"use client";

import { useContext } from "react";
import { ModalContext } from "@/context/ModalContext";
import { UserContext } from "@/context/UserContext";
import { ProjectContext } from "@/context/ProjectContext";
import styles from "./createButton.module.css";
import Modal from "./Modal";

const CreateProjectButton = ({ text }) => {
  const { openModal, closeModal } = useContext(ModalContext);
  const { refreshProjects } = useContext(ProjectContext);
  const { userId } = useContext(UserContext);
  
  if (!userId) {
    return (
      <div>...Loading</div>
    );
  }

  return (
    <div>
      <button
        className="plus-button"
        onClick={() => {
          openModal(
            <Modal refreshProjects={refreshProjects} userId={userId} closeModal={closeModal} />
          )
        }}
      >✚{text? '\u00A0\u00A0' : ''}<span style={{ color: 'black', textShadow: 'none'}}>{text}</span></button>
    </div>
  );
}

export default CreateProjectButton;