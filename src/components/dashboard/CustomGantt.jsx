"use client";

import { useRef, useState } from "react";
import styles from "./customGantt.module.css";
import Image from "next/image";
import { JOBS, JOBS_INT, JOBS_LONG_TITLE } from "@/constants/job";

const CustomGantt = (props) => {
  const { startAt, endAt, users, tasks, setTasks, updateTasks } = props;

  // 날짜 범위 계산
  const getDaysBetween = (start, end) => {
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
  };

  const days = getDaysBetween(startAt, endAt);
  const dragging = useRef(null);
  const startX = useRef(0);
  const originalTask = useRef(null);
  const containerWidth = useRef(0);

  const handleMouseDown = (e, task, mode) => {
    e.stopPropagation();
    dragging.current = { id: task._id, mode };
    startX.current = e.clientX;
    originalTask.current = { ...task };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!dragging.current || !containerWidth.current) return;

    const deltaX = e.clientX - startX.current;
    
    // const dayWidth = e.target.closest("table").clientWidth / days;
    const dayWidth = containerWidth.current.clientWidth / days;
    const dayChange = Math.round(deltaX / dayWidth);

    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task._id !== dragging.current.id) return task;

        let newStart = new Date(originalTask.current.startAt);
        let newEnd = new Date(originalTask.current.endAt);

        newStart.setDate(newStart.getDate() + dayChange);
        newEnd.setDate(newEnd.getDate() + dayChange);

        if (dragging.current.mode === "move") {
          return { ...task, startAt: newStart.toISOString().split("T")[0], endAt: newEnd.toISOString().split("T")[0] };
        } else if (dragging.current.mode === "resize-left") {
          return { ...task, startAt: newStart.toISOString().split("T")[0] };
        } else if (dragging.current.mode === "resize-right") {
          return { ...task, endAt: newEnd.toISOString().split("T")[0] };
        }

        return task;
      })
    );
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  
    if (!dragging.current) return; // dragging이 null이면 종료
  
    const { id, prevStartAt, prevEndAt } = dragging.current;
  
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) => {
        if (task._id !== id) return task;
        return { ...task };
      });
  
      const updatedTask = updatedTasks.find((task) => task._id === id);
  
      if (updatedTask.startAt === prevStartAt && updatedTask.endAt === prevEndAt) {
        dragging.current = null; // 마지막에 초기화
        return updatedTasks; // 변경 없으면 종료
      }
  
      // 🔥 변경사항이 있을 경우, updateTasks 호출
      updateTasks(updatedTask);
  
      dragging.current = null; // 마지막에 초기화
      return updatedTasks;
    });
  };

  const getMonthForDate = (date) => {
    return date.toLocaleDateString("ko-KR", { month: "2-digit" });
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.year}>{2025}년</div>
        <div className={styles.usersWrapper}>
          <div className={styles.users}>
            {users.map((user) => (
              <div key={user._id} className={styles.tempRow}>
                <div className={styles.card}>
                  {/* 앞면 */}
                  <div className={styles.front}>
                    <Image src={user.image} width={30} height={30} style={{borderRadius: "15px"}} alt={user.name} />
                    <div>{user.name}</div>
                  </div>
                  {/* 뒷면 */}
                  <div className={styles.back} style={{backgroundColor: JOBS_INT[Math.floor(user.job/1000)]}}>
                    {JOBS_LONG_TITLE[user.job]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.table}>
        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            <div ref={containerWidth} className={styles.thead}>
              {[...Array(days)].map((_, i) => {
                const currentDate = new Date(startAt);
                currentDate.setDate(startAt.getDate() + i);
                // const currentMonth = getMonthForDate(currentDate);
                // const previousMonth = i > 0 ? getMonthForDate(new Date(startAt.getFullYear(), startAt.getMonth(), startAt.getDate() + i - 1)) : null;
                const isSunday = currentDate.getDay() === 0;
                return (
                  <div key={i} className={`${styles.td} ${styles.calendar}`}>
                    <span className={isSunday ? styles.sunday : ""}>{currentDate.getDate()}</span>
                    {/* {currentMonth !== previousMonth && <span className={styles.month}>{currentDate.getMonth()+1}월</span>}  */}
                    {currentDate.getDate() === 1 && <span className={styles.month}>{currentDate.getMonth() + 1}월</span>}
                  </div>
                );
              })}
            </div>
            <div className={styles.tbody}>
              {users.map((user) => (
                <div key={user._id} className={styles.tempRow}>
                  {[...Array(days)].map((_, i) => <div key={i} className={styles.td}></div>)}
                  {tasks
                    .filter((task) => task.userId === user._id)
                    .map((task) => {
                      const startOffset = getDaysBetween(startAt, new Date(task.startAt)) - 1;
                      const taskLength = getDaysBetween(new Date(task.startAt), new Date(task.endAt));

                      return (
                        <div
                          className={styles.task}
                          key={task._id}
                          style={{
                            left: `${(startOffset / days) * 100}%`,
                            width: `${(taskLength / days) * 100}%`,
                            backgroundColor: JOBS[task.job]
                          }}
                        >
                          <div className={styles.taskResize} onMouseDown={(e) => handleMouseDown(e, task, "resize-left")}></div>
                          <div className={styles.taskContent} onMouseDown={(e) => handleMouseDown(e, task, "move")}>
                            <p>{task.title}</p>
                          </div>
                          <div className={styles.taskResize} onMouseDown={(e) => handleMouseDown(e, task, "resize-right")}></div>
                        </div>
                      );
                    })}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.background}></div>
      </div>
    </div>
  );
};

export default CustomGantt;
