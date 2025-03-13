import { useState } from "react";
import styles from "./modal.module.css";

const Modal = (props) => {
  const { refreshProjects, userId, closeModal } = props;

  const [projectName, setProjectName] = useState("");
  const [startAt, setStartAt] = useState();
  const [endAt, setEndAt] = useState();
  
  const handleCreateProject = async () => {
    if (!projectName) {
      alert("프로젝트 이름을 입력해주세요.");
      return;
    }
    if (!startAt) {
      alert("프로젝트 시작 일을 입력해주세요.");
      return;
    }
    if (!endAt) {
      alert("프로젝트 종료 일을 입력해주세요.");
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
          name: projectName,
          startAt: startAt,
          endAt: endAt
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
  const startHandler = (e) => setStartAt(e.target.value);
  const endHandler = (e) => setEndAt(e.target.value);

  return (
    <div className="item-wrapper">
      <div className="item-label">
        프로젝트 생성
      </div>
      <div className={`item-container ${styles.wrapper}`}>
        <div>
          <label className="form-label" htmlFor="projectName">제목</label>
          <input
            type="text"
            id="projectName"
            className="form-control"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            maxLength={15}
          />
        </div>
        <div>
          <label className="form-label" htmlFor="projectDate">프로젝트 기간</label>
          <div className={styles.date}>
            <input type="date" className="form-control" id="projectDate" defaultValue={startAt} onChange={startHandler} />~
            <input type="date" className="form-control" defaultValue={endAt} onChange={endHandler} />
          </div>
        </div>
        <div className={styles.btnWrapper}>
          <button className="custom-button" onClick={handleCreateProject}>저장</button>
          <button className="custom-button" onClick={closeModal}>취소</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;