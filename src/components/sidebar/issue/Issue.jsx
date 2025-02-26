"use client";

import { UserContext } from "@/context/UserContext";
import { ModalContext } from "@/context/ModalContext";
import { useContext, useEffect, useState } from "react";
import styles from "./issue.module.css";
import Modal from "./Modal";

const Issue = () => {
  const { userId } = useContext(UserContext);
  const { openModal } = useContext(ModalContext);
  const [taskList, setTaskList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getList = async () => {
    try {
      const response = await fetch(`/api/issue/list?userId=${userId}`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("message");
      }
      const data = await response.json();
      setTaskList(data.taskList);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    if (userId) {
      getList();
    }
  }, [userId]);

  return (
    <div className="item-wrapper">
      <div className={`item-label ${styles.label}`}>이슈 관리</div>
      <div className={`item-container ${styles.container}`}>
        <div className={styles.flex}>
          <div>진행중 작업</div>
          {loading ? (
            <div>...Loading</div>
            ) : (
              <button
                className={styles.button}
                onClick={() => {
                  openModal(
                    <Modal taskList={taskList} />
                  )
                }}
              >{taskList.length}개</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Issue;