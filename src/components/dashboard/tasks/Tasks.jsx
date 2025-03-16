import { useRef } from "react";
import styles from "./tasks.module.css";
import { JOBS } from "@/constants/job";

const Tasks = ({ users, days, startAt, tasks, calendarContainerRef, setTasks, updateTasks }) => {

  const dragging = useRef(null);
  const startX = useRef(0);
  const originalTask = useRef(null);

  // 날짜 범위 계산
  const getDaysBetween = (start, end) => {
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
  };

  const handleMouseDown = (e, task, mode) => {
    e.stopPropagation();
    dragging.current = { id: task._id, mode };
    startX.current = e.clientX;
    originalTask.current = { ...task };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!dragging.current || !calendarContainerRef.current) return;

    const deltaX = e.clientX - startX.current;
    
    // const dayWidth = e.target.closest("table").clientWidth / days;
    const dayWidth = calendarContainerRef.current.scrollWidth / days;
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

  return (
    <div>
      {users.map((user) => (
        <div key={user.userId} className={styles.tempRow}>
          {[...Array(days)].map((_, i) => {
            const currentDate = new Date(startAt);
            currentDate.setDate(startAt.getDate() + i);
            const isSunday = currentDate.getDay() === 0;
            return (
              <div key={i} className={`${styles.td} ${isSunday? styles.tdSunday : ""}`}></div>
            );
          })}
          {tasks
            .filter((task) => task.userId === user.userId)
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
  );
}

export default Tasks;