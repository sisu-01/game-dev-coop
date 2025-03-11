"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styles from "./task.module.css";
import Image from "next/image";
import { JOBS } from "@/constants/job";
import { useContext, useState } from "react";
import { ModalContext } from "@/context/ModalContext";
import { UserContext } from "@/context/UserContext";
import Modal from "../createButton/Modal";

const Task = ({ task, projectId }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task._id });
  const { openModal, closeModal } = useContext(ModalContext);
  const { userId } = useContext(UserContext);
  const { columnId } = task;

  const [clickCount, setClickCount] = useState(0);
  const handleClick = () => {
    setClickCount(prev => prev + 1);

    setTimeout(() => {
      setClickCount(0);
    }, 300); // 300ms 내에 두 번 클릭하면 더블클릭으로 간주

    if (clickCount === 1) {
      openModal(
        <Modal userId={userId} task={task} columnId={columnId} projectId={projectId} closeModal={closeModal} />
      )
    }
  };
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? '100' : undefined,
  };

  const targetDate = new Date(task.endAt);
  const today = new Date();
  const targetDateOnly = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
  const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const diffTime = targetDateOnly.getTime() - todayOnly.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const dDay = diffDays > 0 ? `D-${diffDays}일` : "마감";

  return (
    <li
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={styles.container}
      onMouseDown={handleClick}
      style={style}
    >
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