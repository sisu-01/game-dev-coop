import { forwardRef } from "react";
import styles from "./calendar.module.css";

const Calendar = forwardRef(({ startAt, days }, ref) => {
  return (
    <div ref={ref} className={styles.container}>
      {[...Array(days)].map((_, i) => {
        const currentDate = new Date(startAt);
        currentDate.setDate(startAt.getDate() + i);
        const isSunday = currentDate.getDay() === 0;
        return (
          <div key={i} className={`${styles.td} ${styles.calendar}`}>
            <span className={isSunday ? styles.sunday : ""}>{currentDate.getDate()}</span>
            {currentDate.getDate() === 1 && <span className={styles.month}>{currentDate.getMonth() + 1}월</span>}
          </div>
        );
      })}
    </div>
  );
});

export default Calendar;
