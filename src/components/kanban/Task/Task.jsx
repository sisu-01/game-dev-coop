"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styles from "./task.module.css";

const Task = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? '100' : undefined,
  };
  
  return (
    <li ref={setNodeRef} {...attributes} {...listeners} className={styles.container} style={style}>
      {/* seq:{task.sequence}<br/> */}
      {/* id:{task._id}<br/> */}
      <div className={styles.title}>
        {task.title}
      </div>
      <div className={styles.wrapper}>
        <div className={styles.item}>
          <span className={styles.itemLabel}>담당자</span>
          <div>
            z
          </div>
        </div>
        <div className={styles.item}>
          <span className={styles.itemLabel}>시작일</span><div>2099-99-99</div>
        </div>
        <div className={styles.item}>
          <span className={styles.itemLabel}>종료일</span><div>2099-99-99</div>
        </div>
        <div className={styles.item}>
          <span className={styles.itemLabel}>기한</span><div>-999</div>
        </div>
      </div>
      <div className={styles.tagWrapper}>
        <div className={styles.tag}>
          레벨 디자인
        </div>
        <div className={styles.tag}>
          애니메이션
        </div>
      </div>
    </li>
  );
}

export default Task;