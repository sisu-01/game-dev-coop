import styles from "./issue.module.css";

const Issue = () => {

  const count1 = 13;
  const count2 = 2;

  return (
    <div className={styles.container}>
      <div className={styles.label}>이슈</div>
      <div>
        <div className={styles.flex}>
          <div>진행중 작업</div>
          <button>{count1}개</button>
        </div>
        <div className={styles.flex}>
          <div>작업물 댓글</div>
          <button>{count2}개</button>
        </div>
      </div>
    </div>
  );
}

export default Issue;