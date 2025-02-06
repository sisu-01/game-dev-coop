"use client";

import { useDroppable } from "@dnd-kit/core";
import { verticalListSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import Task from "./Task";
import CreateTaskButton from "./createButton/CreateTaskButton";

const Column = ({ id, items, tasks, projectId }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div style={{ width: "200px", minHeight: "300px", padding: "10px", backgroundColor: "#555" }}>
      <SortableContext id={id} items={items} strategy={verticalListSortingStrategy}>
        <h3>
          {id.toUpperCase()}
          <CreateTaskButton columnId={id} projectId={projectId} />
        </h3>
        <ul key={id} ref={setNodeRef}>
          {tasks.map((task) => (
            <Task key={task._id} task={task} />
          ))}
        </ul>
      </SortableContext>
    </div>
  );
};

export default Column;
