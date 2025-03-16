import styles from "./users.module.css";
import { JOBS_INT, JOBS_LONG_TITLE } from "@/constants/job";

const Users = ({ users }) => {
  return (
    <div className={styles.usersWrapper}>
      {users.map((user, index) => {
        // 같은 job을 가진 사용자들만 필터링
        const sameJobUsers = users.filter(u => Math.floor(u.job / 1000) === Math.floor(user.job / 1000));
        // 현재 job 그룹에서 첫 번째와 마지막 사용자 찾기
        let isFirst, isLast, isMiddle, isSingle;
        if (sameJobUsers.length === 1) {
          isFirst = false;
          isLast = false;
          isMiddle = false;
          isSingle = true;
        } else {
          isFirst = sameJobUsers[0].userId === user.userId;
          isLast = sameJobUsers[sameJobUsers.length - 1].userId === user.userId;
          isMiddle = !isFirst && !isLast;
          isSingle = false;
        }

        return (
          <div key={user.userId} className={styles.tempRow}>
            <div
              className={`${styles.jobLine} ${isSingle ? styles.singleJob : ''} ${isFirst ? styles.firstJob : ''} ${isMiddle ? styles.middleJob : ''} ${isLast ? styles.lastJob : ''}`}
              style={{ backgroundColor: JOBS_INT[Math.floor(user.job / 1000)] }}
            ></div>
            <div className={styles.card}>
              {/* 앞면 */}
              <div className={styles.front}>
                <div className={styles.icon} style={{backgroundColor: user.iconColor}}/>
                <div>{user.nickname}</div>
              </div>
              {/* 뒷면 */}
              <div className={styles.back} style={{ backgroundColor: JOBS_INT[Math.floor(user.job / 1000)] }}>
                {JOBS_LONG_TITLE[user.job]}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Users;