import { useState } from "react";
import styles from "./createButton.module.css";

const Modal = (props) => {
  const { refreshProjects, userId, closeModal } = props;

  const [projectName, setProjectName] = useState("");
  const handleCreateProject = async () => {
    if (!projectName) {
      alert("프로젝트 이름을 입력해주세요.");
      return;
    }
    try {
      const response = await fetch("/api/project/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          name: projectName
        }),
      });
      if (!response.ok) {
        throw new Error("프로젝트 생성 실패");
      }
      refreshProjects();
      closeModal();
      //const data = await response.json();
    } catch (error) {
      console.error(error);
    } finally {
    }
  };
  return (
    <div className={styles.container}>
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
        <button onClick={closeModal}>취소</button>
      </div>
    </div>
  );
}

export default Modal;