import Image from "next/image";
import { useEffect, useState } from "react";

const Modal = (props) => {
  const { userId, columnId, projectId, closeModal } = props;
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
    } catch (error) {
      console.error(error);
    } finally {
    }
  };
  const startHandler = (e) => setStartAt(e.target.value);
  const endHandler = (e) => setEndAt(e.target.value);

  if (loading) return (<div>...Loading</div>)

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
        {users.map((user) => (
          <label key={user._id}>
            <input
              type="radio"
              name="user"
              value={user._id}
              checked={selected === user._id}
              onChange={(e) => setSelected(e.target.value)}
            />
            <Image src={user.image} width={30} height={30} alt={user.name} />
            {user.name}
          </label>
        ))}
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