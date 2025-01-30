"use client";

import { useState } from "react";
import styles from "./item.module.css";
import Manage from "./manage/Manage";
import ColorPicker from "./colorPicker/ColorPicker";

const Item = ({ project }) => {
  //project id, name, color
  const [open, setOpen] = useState(false);
  const [openManage, setOpenManage] = useState(false);

  const contents = [
    {"url": "dashboard", "name": "대쉬 보드"},
    {"url": "canboard", "name": "칸반 보드"},
    {"url": "work", "name": "작업물"},
    {"url": "wiki", "name": "위키"},
  ]

  return (
    <div className={styles.container}>
      <div className={styles.colorPicker}>
        <ColorPicker projectId={project.id} color={project.color} />
      </div>
      <div className={styles.admin}>
        {project.role === "admin" && (
          <button className={styles.btn} onClick={() => {setOpenManage(prev => !prev)}}>톱니바퀴</button>
        )}
        {openManage && (
          <Manage projectId={project.id} setOpenManage={setOpenManage} />
        )}
      </div>
      <div className={styles.project} onClick={() => {setOpen(prev => !prev)}}>
        <div className={styles.wrapper}>
          <div className={styles.fake}></div>
          <div>{project.name}</div>
        </div>
      </div>
      <div>
        {open && (
          <div className={styles.content}>
            {contents.map((content) => (
              <div key={content.url}>{content.name}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Item;