import { ModalContext } from "@/context/ModalContext";
import { UserContext } from "@/context/UserContext";
import { ProjectContext } from "@/context/ProjectContext";
import { useContext } from "react";
import styles from "./colorPicker.module.css";
import Modal from "./Modal";

const ColorPicker = ({ projectId, nickname, job, color }) => {
  const { openModal, closeModal } = useContext(ModalContext);
  const { refreshProjects } = useContext(ProjectContext);
  const { userId } = useContext(UserContext);

  return (
    <div
      className={styles.colorBox}
      style={{backgroundColor: color}}
      onClick={() => {
        openModal(
          <Modal 
            projectId={projectId}
            nickname={nickname}
            job={job}
            color={color}
            closeModal={closeModal}
            refreshProjects={refreshProjects}
            userId={userId}
          />
        )
      }}
    />
  );
}

export default ColorPicker;