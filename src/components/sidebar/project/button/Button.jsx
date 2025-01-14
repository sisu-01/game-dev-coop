"use client";

import { useContext, useState } from "react";
import styles from "./button.module.css";
import { UserContext } from "@/context/UserContext";

const Button = () => {
  const [open, setOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const { userId } = useContext(UserContext);
  if (!userId) {
    return (
      <div>...Loading</div>
    );
  }
  const handleCreateProject = async () => {
    if (!projectName) {
      alert("프로젝트 이름을 입력해주세요.");
      return;
    }
    try {
      const response = await fetch("/api/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          name: projectName
        }),
      });
      if (!response.ok) {
        throw new Error("프로젝트 생성 실패");
      } 
      const data = await response.json();
      console.log("프로젝트 생성 성공:", data);
    } catch (error) {
      console.error(error);
    } finally {
      console.log("종료");
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.btn} onClick={() => {setOpen(prev => !prev)}}>+</button>
      {open && (
        <div className={styles.content}>
          <div className={styles.label}>
            프로젝트 생성
          </div>
          <div className={styles.inputWrapper}>
            <div>이름</div>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              id="projectName"
            />
          </div>
          <div className={styles.btnWrapper}>
            <button onClick={handleCreateProject}>저장</button>
            <button onClick={() => {setOpen(false)}}>취소</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Button;