"use client";
import styles from "./kanbanboard.module.css";

const KanbanBoard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        칸반 보드
      </div>
      <div className={styles.content}>
        <div className={styles.wrapper}>
          <div>
            진행 예정<br/>z<br/>z<br/>z<br/>z<br/>z<br/>z<br/>z<br/>z<br/>z<br/>z<br/>z<br/>z<br/>z<br/>z<br/>z
          </div>
          <div>
            진행 중
          </div>
          <div>
            진행 완료
          </div>
        </div>
      </div>
    </div>
  );
}

export default KanbanBoard;