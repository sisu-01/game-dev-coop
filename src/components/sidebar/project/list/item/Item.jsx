"use client";

import { useState } from "react";
import styles from "./item.module.css";
import Manage from "./manage/Manage";
import ColorPicker from "./colorPicker/ColorPicker";

const Item = ({project}) => {
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
      <div className={styles.project}>
        <div className={styles.wrapper}>
          <ColorPicker color={project.color} />
          <div>{project.name}</div>
        </div>
        <button className={styles.btn} onClick={() => {setOpen(prev => !prev)}}>펼치기</button>
        <button className={styles.btn} onClick={() => {setOpenManage(prev => !prev)}}>수정</button>
      </div>
      {open && (
        <div className={styles.content}>
          {contents.map((content) => (
            <div key={content.url}>{content.name}</div>
          ))}
        </div>
      )}
      {openManage && (
        <Manage projectId={project.id} setOpenManage={setOpenManage} />
      )}
    </div>
  );
}

export default Item;