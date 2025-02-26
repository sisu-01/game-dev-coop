"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styles from "./task.module.css";
import Image from "next/image";
import JOBS from "@/constants/job";

const Task = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? '100' : undefined,
  };

  const targetDate = new Date(task.endAt);
  const today = new Date();
  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const dDay = diffDays > 0 ? `-${diffDays}일` : "마감";

  return (
    <li ref={setNodeRef} {...attributes} {...listeners} className={styles.container} style={style}>
      {/* seq:{task.sequence}<br/> */}
      {/* id:{task._id}<br/> */}
      <div className={styles.title} style={{backgroundColor: JOBS[task.job]}}>
        {task.title}
      </div>
      <div className={styles.wrapper}>
        <div className={styles.item}>
          <span className={styles.itemLabel}>담당자</span>
          <div className={styles.imageWrapper}>
            <Image src={task.user.image} width={20} height={20} className={styles.image} alt={task.user.name} />
            {task.user.name}
          </div>
        </div>
        <div className={styles.item}>
          <span className={styles.itemLabel}>시작일</span>
          {/* <div>{task.startAt}</div> */}
          <div>{new Date(task.startAt).toISOString().split("T")[0]}</div>
        </div>
        <div className={styles.item}>
          <span className={styles.itemLabel}>종료일</span>
          {/* <div>{task.endAt}</div> */}
          <div>{new Date(task.endAt).toISOString().split("T")[0]}</div>
        </div>
        <div className={styles.item}>
          <span className={styles.itemLabel}>기한</span><div>{dDay}</div>
        </div>
      </div>
      <div className={styles.tagWrapper}>
        {task.work1 && (
          <div className={styles.tag}>
            {task.work1}
          </div>
        )}
        {task.work2 && (
          <div className={styles.tag}>
            {task.work2}
          </div>
        )}
      </div>
    </li>
  );
}

export default Task;