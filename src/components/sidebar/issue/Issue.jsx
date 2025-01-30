import styles from "./issue.module.css";

const Issue = () => {

  const count1 = 13;
  const count2 = 2;

  return (
    <div>
      <div className={`item-label ${styles.label}`}>이슈 관리</div>
      <div className={`item-container ${styles.container}`}>
        <div className={styles.flex}>
          <div>진행중 작업</div>
          <button className={styles.button}>{count1}개</button>
        </div>
        <div className={styles.flex}>
          <div>작업물 댓글</div>
          <button className={styles.button}>{count2}개</button>
        </div>
      </div>
    </div>
  );
}

export default Issue;