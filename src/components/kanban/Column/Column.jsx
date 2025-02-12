"use client";

import { useDroppable } from "@dnd-kit/core";
import { verticalListSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import Task from "../Task/Task";
import CreateTaskButton from "../createButton/CreateTaskButton";
import styles from "./column.module.css";

const label = {
  "todo": "진행 예정",
  "process": "진행 중",
  "done": "진행 완료"
}

const Column = ({ id, items, tasks, projectId }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div className={styles.container}>
      <SortableContext id={id} items={items} strategy={verticalListSortingStrategy}>
        <div className={styles.label}>
          <span>{label[id]}</span>
          <CreateTaskButton columnId={id} projectId={projectId} />
        </div>
        <ul key={id} ref={setNodeRef} className={styles.wrapper}>
          {tasks.map((task) => (
            <Task key={task._id} task={task} />
          ))}
        </ul>
      </SortableContext>
    </div>
  );
};

export default Column;
