"use client";

import { useState } from "react";
import styles from "./item.module.css";

const Item = ({project}) => {
  //project id, name, color
  
  const [open, setOpen] = useState(false);

  const contents = [
    {"url": "dashboard", "name": "대쉬 보드"},
    {"url": "canboard", "name": "칸반 보드"},
    {"url": "work", "name": "작업물"},
    {"url": "wiki", "name": "위키"},
  ]

  return (
    <div key={project.id} className={styles.container}>
      <div className={styles.project}>
        <div className={styles.wrapper}>
          <div className={styles.colorBox} style={{backgroundColor: project.color}}></div>
          <div>{project.name}</div>
        </div>
        <button className={styles.btn} onClick={() => {setOpen(prev => !prev)}}>···</button>
      </div>
      {open && (
        <div className={styles.content}>
          {contents.map((content) => (
            <div key={content.url}>{content.name}</div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Item;