"use client";

import { useRef } from "react";
import styles from "./customGantt.module.css";
import Users from "./users/Users";
import Calendar from "./calendar/Calendar";
import Tasks from "./tasks/Tasks";
import ScrollX from "./scrollX/ScrollX";
import ScrollY from "./scrollY/ScrollY";

const CustomGantt = (props) => {
  const { startAt, endAt, users, tasks, setTasks, updateTasks } = props;
  const days = Math.ceil((endAt - startAt) / (1000 * 60 * 60 * 24)) + 1;
  const scrollXContainerRef = useRef(null);
  const scrollYContainerRef = useRef(null);
  const calendarContainerRef = useRef(null);
  
  return (
    <>
      <div className={styles.test}>
        <div className={styles.container}>
          <div className="item-container" style={{height: "100%"}}>
            <div className={styles.wrapper}>
              <div className={styles.header}>
                <div className={styles.year}>{2025}년</div>
                <Calendar ref={calendarContainerRef} startAt={startAt} days={days} />
              </div>
              <div className={styles.sidebar} ref={scrollYContainerRef}>
                <Users users={users} />
                <div className={styles.table} ref={scrollXContainerRef}>
                  <div className={styles.contentWrapper}>
                    <div className={styles.content}>
                      <div className={styles.tbody}>
                        <Tasks
                          users={users}
                          days={days}
                          startAt={startAt}
                          tasks={tasks}
                          calendarContainerRef={calendarContainerRef}
                          setTasks={setTasks}
                          updateTasks={updateTasks}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.background} />
            </div>
          </div>
        </div>
        <ScrollY scrollContainerRef={scrollYContainerRef} />
      </div>
      <ScrollX startAt={startAt} scrollContainerRef={scrollXContainerRef} calendarContainerRef={calendarContainerRef} />
    </>
  );
};

export default CustomGantt;
