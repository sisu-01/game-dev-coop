"use client";

import { useContext } from "react";
import { ModalContext } from "@/context/ModalContext";
import { UserContext } from "@/context/UserContext";
import Modal from "./Modal";

const CreateTaskButton = (props) => {
  const { openModal, closeModal } = useContext(ModalContext);
  const { userId } = useContext(UserContext);
  const { columnId, projectId } = props;

  return (
    <button
      onClick={() => {
        openModal(
          <Modal userId={userId} columnId={columnId} projectId={projectId} closeModal={closeModal} />
        )
      }}
    >
      CreateTaskButton, {columnId}
    </button>
  );
}

export default CreateTaskButton;