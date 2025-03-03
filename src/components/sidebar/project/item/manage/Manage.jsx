"use client";

import { useContext } from "react";
import { ModalContext } from "@/context/ModalContext";
import { ProjectContext } from "@/context/ProjectContext";
import { UserContext } from "@/context/UserContext";
import styles from "./manage.module.css";
import Modal from "./Modal";

const Manage = (props) => {
  const { projectId } = props;
  const { openModal, closeModal } = useContext(ModalContext);
  const { refreshProjects } = useContext(ProjectContext);
  const { userId } = useContext(UserContext);

  return (
    <button
      className="plus-button"
      onClick={() => {openModal(
        <Modal
          projectId={projectId}
          closeModal={closeModal}
          refreshProjects={refreshProjects}
          userId={userId}
        />
      )
    }}>⚙</button>
  );
}

export default Manage;