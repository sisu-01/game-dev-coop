import { KanbanContext } from "@/context/KanbanContext";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import styles from "./modal.module.css";
import { JOBS } from "@/constants/job";

const label = {
  "todo": "진행 예정",
  "process": "진행 중",
  "done": "진행 완료",
  "planning": "기획",
  "programming": "프로그래밍",
  "art": "아트",
}

const Modal = (props) => {
  const { task, columnId, projectId, closeModal } = props;
  const { refreshTasks } = useContext(KanbanContext);
  const [taskTitle, setTaskTitle] = useState(task?.title || "");
  const [startAt, setStartAt] = useState(task?.startAt ? new Date(task.startAt).toISOString().split("T")[0] : undefined);
  const [endAt, setEndAt] = useState(task?.endAt ? new Date(task.endAt).toISOString().split("T")[0] : undefined);
  const [users, setUsers] = useState([]);
  const [jobSelected, setJobSelected] = useState(task?.job || undefined);
  const [userSelected, setUserSelected] = useState(task?.user._id || undefined);
  const [work1, setWork1] = useState(task?.work1 || "");
  const [work2, setWork2] = useState(task?.work2 || "");
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
    if (!jobSelected) {
      alert("Task 직군을 입력해주세요.");
      return;      
    }
    if (!taskTitle) {
      alert("Task 제목을 입력해주세요.");
      return;
    }
    if (!userSelected) {
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
      const url = task ? "/api/kanban/update/" : "/api/kanban/create";
      const method = task ? "PUT" : "POST";
      const body = {
        columnId: columnId,
        job: jobSelected,
        userId: userSelected,
        title: taskTitle,
        startAt: startAt,
        endAt: endAt,
        work1: work1,
        work2: work2,
        projectId: projectId,
      };
      if (task) {
        body._id = task._id;
      }
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
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
        {label[columnId]} task {task? "수정" : "생성"}
      </div>
      <div className={`item-container ${styles.wrapper}`}>
        <div>
          <label htmlFor="kanbanTitle" className="form-label">직군</label>
          <div className={styles.jobContainer}>
            {Object.entries(JOBS).map(([key, color]) => (
              <label key={key} className={styles.userWrapper} style={{backgroundColor: color, color: "black"}}>
                <div className={styles.user}>
                  {label[key]}
                </div>
                <input
                  type="radio"
                  name="job"
                  value={key}
                  checked={jobSelected === key}
                  onChange={(e) => setJobSelected(e.target.value)}
                />
              </label>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="kanbanTitle" className="form-label">제목</label>
          <input
            type="text"
            className="form-control"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            id="kanbanTitle"
          />
        </div>
        <div>
          <label htmlFor="kanbanDate" className="form-label">task 기간</label>
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
                  checked={userSelected === user._id}
                  onChange={(e) => setUserSelected(e.target.value)}
                />
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="form-label">업무</label>
          <div>
            <input
              type="text"
              className="form-control"
              value={work1}
              onChange={(e) => setWork1(e.target.value)}
              maxLength={6}
            />
            <input
              type="text"
              className="form-control"
              value={work2}
              onChange={(e) => setWork2(e.target.value)}
              maxLength={6}
            />
          </div>
        </div>
        <div className={styles.btnWrapper}>
          <button className="custom-button" onClick={handleCreateTask}>저장</button>
          <button className="custom-button" onClick={closeModal}>취소</button>
        </div>
      </div>
      
    </div>
  );
}

export default Modal;