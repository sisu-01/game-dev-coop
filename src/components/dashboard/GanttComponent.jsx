import { Gantt, WillowDark } from "wx-react-gantt";
import "wx-react-gantt/dist/gantt.css";

const tasks = [
  {
    id: 20,
    text: "철광석 캐기",
    start: new Date(2025, 2, 1),
    end: new Date(2025, 2, 2),
    duration: 1,
    progress: 2,
    type: "task",
    lazy: false,
  },
  {
    id: 47,
    text: "크아악",
    start: new Date(2025, 2, 3),
    end: new Date(2025, 2, 4),
    duration: 8,
    progress: 0,
    parent: 0,
    type: "summary",
  },
  {
    id: 22,
    text: "무슨 업무?",
    start: new Date(2025, 2, 6),
    end: new Date(2025, 2, 7),
    duration: 8,
    progress: 0,
    parent: 47,
    type: "task",
  },
  {
    id: 21,
    text: "철골렘 만들기",
    start: new Date(2025, 2, 10),
    end: new Date(2025, 2, 12),
    duration: 3,
    progress: 0,
    type: "task",
    lazy: false,
  },
];

const links = [{ id: 1, source: 20, target: 21, type: "e2s" }];

const scales = [
  { unit: "month", step: 1, format: "MMMM yyy" },
  { unit: "day", step: 1, format: "d" },
];

const GanttComponent = () => {
  return (
    <WillowDark>
      <Gantt
        tasks={tasks}
        links={links}
        scales={scales}
        start={new Date(2025, 2, 1)}
        end={new Date(2025, 2, 28)}
      />
    </WillowDark>
  );
}

export default GanttComponent;