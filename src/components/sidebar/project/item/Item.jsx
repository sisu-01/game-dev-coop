"use client";

import { useRouter } from 'next/navigation';
import { useState } from "react";
import styles from "./item.module.css";
import Manage from "./manage/Manage";
import ColorPicker from "./colorPicker/ColorPicker";
import Link from 'next/link';

const Item = ({ project }) => {
  //project id, name, color
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const contents = [
    {"url": "dashboard", "name": "대쉬 보드"},
    {"url": "kanbanboard", "name": "칸반 보드"},
    {"url": "work", "name": "작업물"},
    {"url": "wiki", "name": "위키"},
  ]

  return (
    <div className={styles.container}>
      <div className={styles.colorPicker}>
        <ColorPicker projectId={project.id} job={project.job} color={project.color} />
      </div>
      <div className={styles.admin}>
        {project.role === "admin" && (
          <Manage projectId={project.id} />
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
          <ul className={styles.content}>
            {contents.map((content) => (
              <li key={content.url}>
                <Link href={`/${project.id}/${content.url}`} className={styles.link}>{content.name}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Item;