"use client";

import { useContext, useEffect, useState } from "react";
import Button from "./createButton/CreateButton";
import Item from "./item/Item";
import styles from "./project.module.css";
import { UserContext } from "@/context/UserContext";
import { ProjectContext } from "@/context/ProjectContext";

const Project = () => {
  const { refreshTrigger } = useContext(ProjectContext);
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
  }, [userId, refreshTrigger]);

  return (
    <>
      <div className="item-label" style={{marginBottom: "-7px"}}>
        프로젝트 관리
      </div>
      <div className="item-container" style={{overflow: "auto"}}>
        {loading ? (
          <div>...Loading</div>
        ) : (
          <div>
            <div className={styles.list}>
              {projects.map((project) => (
                <Item key={project.id} project={project} />
              ))}
            </div>
            <div className={styles.btnWrapper}>
              <Button />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Project;