import { useState } from "react";

const Modal = (props) => {
  const { userId, columnId, projectId, closeModal } = props;
  const [taskTitle, setTaskTitle] = useState("");
  const [startAt, setStartAt] = useState();
  const [endAt, setEndAt] = useState();

  const handleCreateTask = async () => {
    if (!taskTitle) {
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
      const response = await fetch("/api/kanban/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          columnId: columnId,
          userId: userId,
          title: taskTitle,
          startAt: startAt,
          endAt: endAt,
          projectId: projectId,
        }),
      });
      if (!response.ok) {
        throw new Error("프로젝트 생성 실패");
      }
      closeModal();
    } catch (error) {
      console.error(error);
    } finally {
    }
  };
  const startHandler = (e) => setStartAt(e.target.value);
  const endHandler = (e) => setEndAt(e.target.value);

  return (
    <div>
      <div>
        task 생성
      </div>
      <div>
        title: <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          id="projectTitle"
        />
      </div>
      <div>
        <input type="date" defaultValue={startAt} onChange={startHandler} />~
        <input type="date" defaultValue={endAt} onChange={endHandler} />
      </div>
      <div>
        <button onClick={handleCreateTask}>저장</button>
        <button onClick={closeModal}>취소</button>
      </div>
    </div>
  );
}

export default Modal;