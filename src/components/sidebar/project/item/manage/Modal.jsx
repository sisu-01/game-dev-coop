import { useEffect, useState } from "react";
import Image from "next/image";
import Invite from "./invite/Invite";
import DeleteButton from "./delete/DeleteButton";
import Expel from "./expel/Expel";
import styles from "./modal.module.css";

const Modal = (props) => {
  const { projectId, closeModal, refreshProjects, userId } = props;
  const [name, setName]= useState("");
  const [startAt, setStartAt] = useState();
  const [endAt, setEndAt] = useState();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProjectInfo = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/project/info?projectId=${projectId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("프로젝트 조회 실패");
      }
      const data = await response.json();
      const { result } = data;
      setName(result.name);
      if (result.startAt !== undefined) setStartAt(new Date(result.startAt).toISOString().split("T")[0]);
      if (result.endAt !== undefined) setEndAt(new Date(result.endAt).toISOString().split("T")[0]);
      setUsers(result.users);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProjectInfo();
  }, []);

  const nameHandler = (e) => setName(e.target.value);
  const startHandler = (e) => setStartAt(e.target.value);
  const endHandler = (e) => setEndAt(e.target.value);

  const updateProject = async () => {
    try {
      const response = await fetch(`/api/project/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          projectId: projectId,
          name: name,
          startAt: startAt,
          endAt: endAt,
        })
      });
      if (!response.ok) {
        console.log("문제 발생");
      }
      refreshProjects();
      closeModal();
    } catch (error) {
      console.error(error);
    }
    closeModal();
  }

  return (
    <div className="item-wrapper">
      {loading? (
        <div>...Loading</div>
      ) : (
        <>
          <div className="item-label">
            프로젝트 관리
          </div>
          <div className={`item-container ${styles.wrapper}`}>
            <div>
              <label htmlFor="projectName" className="form-label">제목</label>
              <input
                type="text"
                id="projectName"
                className="form-control"
                defaultValue={name}
                onChange={nameHandler}
                maxLength={15}
              />
            </div>
            <div>
              <label htmlFor="projectDate" className="form-label">프로젝트 기간</label>
              <div className={styles.date}>
                <input type="date" id="projectDate" className="form-control" defaultValue={startAt} onChange={startHandler} />~
                <input type="date" className="form-control" defaultValue={endAt} onChange={endHandler} />
              </div>
            </div>
            <div>
              <label className="form-label">멤버 관리</label>
              <div className={styles.userContainer}>
                {users.map((user) => (
                  <div key={user.userId} className={styles.userWrapper}>
                    <div className={styles.user}>
                      <div className={styles.icon} style={{backgroundColor: user.iconColor}} />
                      {user.nickname}
                    </div>
                    {userId !== user.userId && (
                      <Expel userId={user.userId} projectId={projectId} getProjectInfo={getProjectInfo} />
                    )}
                  </div>
                ))}
              </div>
              <Invite projectId={projectId} />
            </div>
            <div className={styles.btnWrapper}>
              <DeleteButton projectId={projectId} closeModal={closeModal} refreshProjects={refreshProjects} userId={userId} />
              <button className="custom-button" onClick={updateProject}>저장</button>
              <button className="custom-button" onClick={closeModal}>닫기</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Modal;