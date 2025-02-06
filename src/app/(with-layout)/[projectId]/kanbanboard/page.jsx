"use client";

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { closestCenter, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import styles from "./kanbanboard.module.css";
import Column from "@/components/kanban/Column";
import { usePathname } from 'next/navigation';

const DndContextWithNoSSR = dynamic(() => import('@dnd-kit/core').then(mod => mod.DndContext), { ssr: false });
//https://www.davegray.codes/posts/missing-example-for-react-drag-n-drop#client-side-react-vs-nextjs

// const initialTasks = [
//   { _id: "task-0", title: "프로젝트 이름 정하기", columnId: "done", sequence: 0 },
//   { _id: "task-1", title: "프로젝트 개하기", columnId: "process", sequence: 0 },
//   { _id: "task-2", title: "팬싸인회 준비하기", columnId: "todo", sequence: 0 },
//   { _id: "task-3", title: "머스크와 미팅 일정 잡기", columnId: "todo", sequence: 1 },
// ];
const columns = ["todo", "process", "done"];

const KanbanBoard = () => {
  const [tasks, setTasks] = useState({
    todo: [],
    process: [],
    done: [],
  });
  const [activeId, setActiveId] = useState(null);
  const pathname = usePathname();
  const projectId = pathname?.split('/')[1];

  const getTasks = async () => {
    try {
      const response = await fetch(`/api/kanban/list?projectId=${projectId}`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("message");
      }
      const data = await response.json();
      const groupedTasks = data.tasks.reduce((acc, task) => {
        acc[task.columnId] = [...(acc[task.columnId] || []), task];
        return acc;
      }, {});
      console.log(groupedTasks);
      setTasks(groupedTasks);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getTasks();
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor), 
    // useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;

    console.log("active item", active.data.current.sortable);
    console.log("over item", over.data.current?.sortable || "tq");
    const oldColumn = active.data.current?.sortable.containerId;
    const newColumn = over.data.current?.sortable.containerId;
    const oldIndex = event.active.data.current.sortable.index;
    const newIndex = over.data.current?.sortable.index;
    console.log("oldColumn", oldColumn, "oldIndex", oldIndex);
    console.log("newColumn", newColumn, "newIndex", newIndex);

    let updatedTasks = { ...tasks };
    if (oldColumn === newColumn) {
      updatedTasks[newColumn] = arrayMove(updatedTasks[newColumn], oldIndex, newIndex);
    } else {
      const movedTask = { ...tasks[oldColumn][oldIndex], columnId: newColumn };
      updatedTasks[oldColumn] = tasks[oldColumn].filter((_, idx) => idx !== oldIndex);
      updatedTasks[newColumn] = [...tasks[newColumn].slice(0, newIndex), movedTask, ...tasks[newColumn].slice(newIndex)];
    }
    console.log(updatedTasks);
    try {
      const response = await fetch(`/api/kanban/dnd`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          tasks: Object.values(updatedTasks).flat().map((task, idx) => ({ id: task._id, sequence: idx, columnId: task.columnId })),
        }),
      });
      if (!response.ok) {
        throw new Error("message");
      }
      setTasks(updatedTasks);
    } catch (error) {
      console.error(error);
    }
    setActiveId(null);
  };

  const handleDelete = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        칸반 보드
      </div>
      <div className={styles.content}>
        {/* {tasks.map((task) => (
          <div key={task.id}>{task.id}, {task.content}, {task.column}</div>
        ))} */}
        activeId: {activeId}
        <div className={styles.wrapper}>
          <DndContextWithNoSSR
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div style={{ display: "flex", gap: "20px" }}>
              {columns.map(columnId => (
                <Column 
                  key={columnId} 
                  id={columnId} 
                  items={(tasks[columnId] || []).map((t) => t.id)} 
                  tasks={tasks[columnId] || []} 
                  projectId={projectId}
                />
              ))}
              {/* 
                <SortableContext items={tasks[columnId].map((t) => t._id)} strategy={verticalListSortingStrategy}>
                  {tasks[columnId].map((task) => (
                    <TaskCard key={task._id} task={task} columnId={columnId} />
                  ))}
                </SortableContext> */}
              {/* {columns.map((column) => (
                <Column key={column} id={column} items={tasks.filter((task)=> task.column === column)} />
              ))} */}
            </div>
          </DndContextWithNoSSR>
          {activeId && (
            <div>어딜만져</div>
          )}
          {/* <DragOverlay>
            {activeId && <Task task={tasks.find((task) => task.id === activeId)} />}
          </DragOverlay> */}
          {/* <div className={`item-container ${styles.item}`}>
            진행 예정
            <br/>z<br/>z<br/>z<br/>z<br/>z<br/>z<br/>z<br/>z
            <br/>z<br/>z<br/>z<br/>z<br/>z<br/>z<br/>z<br/>z
            <br/>z<br/>z<br/>z<br/>z<br/>z<br/>z<br/>z<br/>z
            <br/>z<br/>z<br/>z<br/>z<br/>z<br/>z<br/>z<br/>z
          </div>
          <div className={`item-container ${styles.item}`}>
            진행 중
          </div>
          <div className={`item-container ${styles.item}`}>
            진행 완료
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default KanbanBoard;