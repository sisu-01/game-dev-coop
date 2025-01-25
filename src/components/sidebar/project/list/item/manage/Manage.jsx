"use client";

import { UserContext } from "@/context/UserContext";
import { useEffect, useContext, useState } from "react";
import styles from "./manage.module.css";
import Image from "next/image";
import Invite from "./invite/Invite";
import DeleteButton from "./delete/DeleteButton";

const Manage = (props) => {
  const { userId } = useContext(UserContext);
  const { projectId, setOpenManage } = props;
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
    console.log("update");
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
    } catch (error) {
      console.error(error);
    }
    setOpenManage(false);
  }

  return (
    <div className={styles.container}>
      {loading? (
        <div>...Loading</div>
      ) : (
        <>
          <div className={styles.label}>프로젝트 관리</div>
          <div>
            <input type="text" defaultValue={name} onChange={nameHandler} />
          </div>
          <div className={styles.label}>프로젝트 기간</div>
          <div>
            <input type="date" defaultValue={startAt} onChange={startHandler} />~
            <input type="date" defaultValue={endAt} onChange={endHandler} />
          </div>
          <div className={styles.label}>멤버 관리</div>
          <div>
            <div>
              {users.map((user) => (
                <div key={user._id}>
                  <Image src={user.image} width={30} height={30} alt={user.name} />
                  {user.name}
                </div>
              ))}
            </div>
            <div>
              <Invite projectId={projectId} />
            </div>
          </div>
          <div>
            <DeleteButton projectId={projectId} />
            <button onClick={updateProject}>저장</button>
            <button onClick={() => setOpenManage(false)}>닫기</button>
          </div>
        </>
      )}
      
    </div>
  );
}

export default Manage;