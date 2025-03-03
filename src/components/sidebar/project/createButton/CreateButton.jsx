"use client";

import { useContext } from "react";
import { ModalContext } from "@/context/ModalContext";
import { UserContext } from "@/context/UserContext";
import { ProjectContext } from "@/context/ProjectContext";
import styles from "./createButton.module.css";
import Modal from "./Modal";

const Button = () => {
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
      >✚</button>
      {/* {open && (
        <div className={styles.content}>
          <div className={styles.label}>
            프로젝트 생성
          </div>
          <div className={styles.inputWrapper}>
            <div>이름</div>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              id="projectName"
            />
          </div>
          <div className={styles.btnWrapper}>
            <button onClick={handleCreateProject}>저장</button>
            <button onClick={() => {setOpen(false)}}>취소</button>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default Button;