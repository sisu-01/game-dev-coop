import { useRef, useState } from "react";

const CustomGantt = () => {
  const [startDate, setStartDate] = useState(new Date("2025-02-01"));
  const [endDate, setEndDate] = useState(new Date("2025-03-10"));
  const [tasks, setTasks] = useState([
    { id: 1, name: "game-dev 설계", start: "2025-02-02", end: "2025-02-03", user: 1 },
    { id: 2, name: "ㅇㅇㅇ비", start: "2025-02-03", end: "2025-02-04", user: 1 },
    { id: 3, name: "밥먹기", start: "2025-02-01", end: "2025-02-05", user: 2 },
    { id: 4, name: "로아하기", start: "2025-02-03", end: "2025-02-08", user: 3 },
    { id: 5, name: "프론트맨 찾기", start: "2025-02-02", end: "2025-02-06", user: 4 },
  ]);

  const users = [
    { id: 1, name: "박유빈" },
    { id: 2, name: "이종원" },
    { id: 3, name: "송민기" },
    { id: 4, name: "성기훈" },
  ];

  // 날짜 범위 계산
  const getDaysBetween = (start, end) => {
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
  };

  const days = getDaysBetween(startDate, endDate);
  const dragging = useRef(null);
  const startX = useRef(0);
  const originalTask = useRef(null);
  const containerWidth = useRef(0);

  const handleMouseDown = (e, task, mode) => {
    e.stopPropagation();
    dragging.current = { id: task.id, mode };
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
        if (task.id !== dragging.current.id) return task;

        let newStart = new Date(originalTask.current.start);
        let newEnd = new Date(originalTask.current.end);

        newStart.setDate(newStart.getDate() + dayChange);
        newEnd.setDate(newEnd.getDate() + dayChange);

        if (dragging.current.mode === "move") {
          return { ...task, start: newStart.toISOString().split("T")[0], end: newEnd.toISOString().split("T")[0] };
        } else if (dragging.current.mode === "resize-left") {
          return { ...task, start: newStart.toISOString().split("T")[0] };
        } else if (dragging.current.mode === "resize-right") {
          return { ...task, end: newEnd.toISOString().split("T")[0] };
        }

        return task;
      })
    );
  };

  const handleMouseUp = () => {
    dragging.current = null;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  // 날짜 포맷 함수 (MM-DD (요일))
  const formatDate = (date) => {
    const options = { month: "2-digit", day: "2-digit", weekday: "short" };
    return date.toLocaleDateString("ko-KR", options).replace(". ", "-").replace(".", "");
  };

  return (
    <div style={{ width: "100%", overflow: "auto" }}>
      <div ref={containerWidth} border="1" style={{ width: "100%" }}>
        <div>
          <div style={{display: "flex"}}>
            {[...Array(days)].map((_, i) => {
              const currentDate = new Date(startDate);
              currentDate.setDate(startDate.getDate() + i);
              return <div key={i}>{formatDate(currentDate)}</div>;
            })}
          </div>
        </div>
        <div>
          {users.map((user) => (
            <div key={user.id} style={{ display: "flex", height: "50px", position: "relative" }}>
              {[...Array(days)].map((_, i) => <div key={i}>z</div>)}
              {tasks
                .filter((task) => task.user === user.id)
                .map((task) => {
                  const startOffset = getDaysBetween(startDate, new Date(task.start)) - 1;
                  const taskLength = getDaysBetween(new Date(task.start), new Date(task.end));

                  return (
                    <div
                      key={task.id}
                      style={{
                        position: "absolute",
                        left: `${(startOffset / days) * 100}%`,
                        width: `${(taskLength / days) * 100}%`,
                        top: "5px",
                        height: "40px",
                        background: "blue",
                        color: "white",
                        textAlign: "center",
                        lineHeight: "40px",
                        cursor: "grab",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0 5px",
                      }}
                    >
                      <div
                        onMouseDown={(e) => handleMouseDown(e, task, "resize-left")}
                        style={{ width: "10px", height: "100%", cursor: "ew-resize", background: "darkblue" }}
                      ></div>

                      <div
                        onMouseDown={(e) => handleMouseDown(e, task, "move")}
                        style={{ flexGrow: 1, cursor: "grab", fontSize: "15px" }}
                      >
                        {task.name}
                      </div>

                      <div
                        onMouseDown={(e) => handleMouseDown(e, task, "resize-right")}
                        style={{ width: "10px", height: "100%", cursor: "ew-resize", background: "darkblue" }}
                      ></div>
                    </div>
                  );
                })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomGantt;
