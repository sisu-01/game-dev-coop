"use client";

import { useState } from "react";
import styles from "./button.module.css";

const Button = () => {
  const [open, setOpen] = useState(false);

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
            <input type="text" name="" id="" />
          </div>
          <div className={styles.btnWrapper}>
            <button>저장</button>
            <button onClick={() => {setOpen(false)}}>취소</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Button;