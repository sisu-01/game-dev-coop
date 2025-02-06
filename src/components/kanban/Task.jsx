"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Task = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "10px",
    margin: "5px",
    backgroundColor: "#000",
    cursor: "grab",
    display: "flex",
    justifyContent: "space-between",
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? '100' : undefined,
  };
  
  return (
    <li ref={setNodeRef} {...attributes} {...listeners} style={style}>
      seq:{task.sequence}<br/>
      id:{task._id}<br/>
      title:{task.title}
    </li>
  );
}

export default Task;