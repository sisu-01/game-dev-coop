import { KanbanContext } from "@/context/KanbanContext";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import styles from "./modal.module.css";

const label = {
  "todo": "진행 예정",
  "process": "진행 중",
  "done": "진행 완료"
}

const Modal = (props) => {
  const { columnId, projectId, closeModal } = props;
  const { refreshTasks } = useContext(KanbanContext);
  const [taskTitle, setTaskTitle] = useState("");
  const [startAt, setStartAt] = useState();
  const [endAt, setEndAt] = useState();
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState();
  const [loading, setLoading] = useState(true);

  const getUserList = async () => {
    try {
      const response = await fetch(`/api/kanban/user?projectId=${projectId}`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("message");
      }
      const data = await response.json();
      setUsers(data.users);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUserList();
  }, []);

  const handleCreateTask = async () => {
    if (!taskTitle) {
      alert("Task 제목을 입력해주세요.");
      return;
    }
    if (!selected) {
      alert("Task 담당자를 입력해주세요.");
      return;
    }
    if (!startAt) {
      alert("Task 시작 일을 입력해주세요.");
      return;
    }
    if (!endAt) {
      alert("Task 종료 일을 입력해주세요.");
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
          userId: selected,
          title: taskTitle,
          startAt: startAt,
          endAt: endAt,
          projectId: projectId,
        }),
      });
      if (!response.ok) {
        throw new Error("Task 생성 실패");
      }
      closeModal();
      refreshTasks();
    } catch (error) {
      console.error(error);
    } finally {
    }
  };
  const startHandler = (e) => setStartAt(e.target.value);
  const endHandler = (e) => setEndAt(e.target.value);

  if (loading) return (<div>...Loading</div>)

  return (
    <div className="item-wrapper">
      <div className="item-label">
        {label[columnId]} task 생성
      </div>
      <div className={`item-container ${styles.wrapper}`}>
        <div>
          <label for="kanbanTitle" className="form-label">제목</label>
          <input
            type="text"
            className="form-control"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            id="kanbanTitle"
          />
        </div>
        <div>
          <label for="kanbanDate" className="form-label">task 기간</label>
          <div className={styles.date}>
            <input type="date" id="kanbanDate" className="form-control" defaultValue={startAt} onChange={startHandler} />~
            <input type="date" className="form-control" defaultValue={endAt} onChange={endHandler} />
          </div>
        </div>
        <div>
          <label className="form-label">담당자</label>
          <div className={styles.userContainer}>
            {users.map((user) => (
              <label key={user._id} className={styles.userWrapper}>
                <div className={styles.user}>
                  <Image src={user.image} width={30} height={30} alt={user.name} />
                  {user.name}
                </div>
                <input
                  type="radio"
                  name="user"
                  value={user._id}
                  checked={selected === user._id}
                  onChange={(e) => setSelected(e.target.value)}
                />
              </label>
            ))}
          </div>
        </div>
        <div className={styles.btnWrapper}>
          <button onClick={handleCreateTask}>저장</button>
          <button onClick={closeModal}>취소</button>
        </div>
      </div>
      
    </div>
  );
}

export default Modal;