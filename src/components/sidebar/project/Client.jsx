"use client";

import { useContext, useEffect, useState } from "react";
import Button from "./button/Button";
import Item from "./list/item/Item";
import styles from "./project.module.css";
import { UserContext } from "@/context/UserContext";

const Project = () => {
  const { userId } = useContext(UserContext);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProjectList = async () => {
    try {
      setLoading(true); // 로딩 시작
      const response = await fetch(`/api/project/list?userId=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("프로젝트 조회 실패");
      }
      const data = await response.json();
      setProjects(data.projects); // 프로젝트 목록 상태 업데이트
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // 로딩 종료
    }
  };
  useEffect(() => {
    if (userId) {
      getProjectList();
    }
  }, [userId]);

  return (
    <div className={styles.container}>
      <div className={styles.label}>
        프로젝트
      </div>
      {loading ? (
        <div>...Loading</div>
      ) : (
        <>
          <div className={styles.list}>
            {projects.map((project) => (
              <Item key={project.id} project={project} />
            ))}
          </div>
          <div className={styles.btnWrapper}>
            <Button />
          </div>
        </>
      )}
    </div>
  );
}

export default Project;