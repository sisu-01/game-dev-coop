import { useState } from "react";

const Modal = (props) => {
  const { userId, columnId, projectId, closeModal } = props;
  const [taskTitle, setTaskTitle] = useState("");

  const handleCreateTask = async () => {
    if (!taskTitle) {
      alert("프로젝트 이름을 입력해주세요.");
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
        <button onClick={handleCreateTask}>저장</button>
        <button onClick={closeModal}>취소</button>
      </div>
    </div>
  );
}

export default Modal;