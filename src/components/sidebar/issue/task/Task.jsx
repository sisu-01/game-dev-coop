import { JOBS } from "@/constants/job";
import styles from "./task.module.css";

const Task = ({ task }) => {

  const targetDate = new Date(task.endAt);
  const today = new Date();
  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const dDay = diffDays > 0 ? `-${diffDays}일` : "마감";

  return (
    <div className={styles.task} style={{backgroundColor: JOBS[task.job]}}>
      <span>{task.title}</span>
      <span>{dDay}</span>
    </div>
  );
}

export default Task;