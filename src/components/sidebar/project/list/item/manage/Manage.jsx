"use client";

import { useEffect, useState } from "react";
import styles from "./manage.module.css";
import Image from "next/image";
import Invite from "./invite/Invite";

const Manage = (props) => {
  const { projectId, setOpenManage } = props;
  const [name, setName]= useState("");
  const [startAt, setStartAt] = useState();
  const [endAt, setEndAt] = useState();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProjectInfo = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/project/update?projectId=${projectId}`, {
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
      setStartAt(result.startAt);
      setEndAt(result.endAt);
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

  return (
    <div className={styles.container}>
      {loading? (
        <div>...Loading</div>
      ) : (
        <>
          <div className={styles.label}>프로젝트 관리</div>
          <div>
            <input type="text" defaultValue={name} />
          </div>
          <div className={styles.label}>프로젝트 기간</div>
          <div>
            <input type="date" defaultValue={startAt} />~
            <input type="date" defaultValue={endAt} />
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
              <Invite />
            </div>
          </div>
          <div>
            <button>프로젝트 삭제</button>
            <button onClick={() => setOpenManage(false)}>확인</button>
          </div>
        </>
      )}
      
    </div>
  );
}

export default Manage;