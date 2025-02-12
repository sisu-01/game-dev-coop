"use client";

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { closestCenter, DragOverlay, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import styles from "./kanbanboard.module.css";
import Column from "@/components/kanban/Column/Column";
import { usePathname } from 'next/navigation';
import Task from '@/components/kanban/Task/Task';

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
  const [activeTask, setActiveTask] = useState({});
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
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );
  
  const handleDragStart = (event) => {
    const activeContainerId = event.active.data.current.sortable.containerId;
    const activeItemId = event.active.id;
    setActiveId({
      activeContainerId: activeContainerId,
      activeItemId: activeItemId
    });
    setActiveTask(tasks[activeContainerId].find((task) => task._id === activeItemId));
  };
  
  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeContainer = active.data.current.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId || over.id;
    if (activeContainer !== overContainer) {
      const activeIndex = event.active.data.current.sortable.index;
      //const overIndex = over.data.current?.sortable.index;
      const overIndex = over.id in tasks?
        tasks[overContainer].length + 1 : over.data.current.sortable.index;

      let updatedTasks = {...tasks};
      const movedTask = { ...tasks[activeContainer][activeIndex], columnId: overContainer };
      updatedTasks[activeContainer] = tasks[activeContainer].filter((_, idx) => idx !== activeIndex);
      updatedTasks[overContainer] = [...tasks[overContainer].slice(0, overIndex), movedTask, ...tasks[overContainer].slice(overIndex)];
      setTasks(updatedTasks);
    }
  }

  const handleDragEnd = async (event) => {
    setActiveId(null);
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    const activeContainer = active.data.current?.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId;
    const activeIndex = event.active.data.current.sortable.index;
    const overIndex = over.data.current?.sortable.index;

    let updatedTasks = { ...tasks };
    if (activeContainer === overContainer) {
      updatedTasks[overContainer] = arrayMove(updatedTasks[overContainer], activeIndex, overIndex);
    } else {
      const movedTask = { ...tasks[activeContainer][activeIndex], columnId: overContainer };
      updatedTasks[activeContainer] = tasks[activeContainer].filter((_, idx) => idx !== activeIndex);
      updatedTasks[overContainer] = [...tasks[overContainer].slice(0, overIndex), movedTask, ...tasks[overContainer].slice(overIndex)];
    }
    try {
      const response = await fetch(`/api/kanban/dnd`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          tasks: Object.values(updatedTasks).flat().map((task, idx) => ({ _id: task._id, sequence: idx, columnId: task.columnId })),
        }),
      });
      if (!response.ok) {
        throw new Error("message");
      }
      setTasks(updatedTasks);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (taskId) => {
    setTasks((prev) => prev.filter((task) => task._id !== taskId));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        칸반 보드
        <button>톱니바퀴</button>
      </div>
      <div className={styles.content}>
        {/* activeId: {activeId?.activeContainerId}<br/>
        activeId: {activeId?.activeItemId} */}
        <DndContextWithNoSSR
          sensors={sensors}
          onDragStart={handleDragStart}
          // onDragOver={handleDragOver}
          //https://github.com/clauderic/dnd-kit/issues/900 여기 해결 방법??????
          onDragEnd={handleDragEnd}
        >
          {columns.map(columnId => (
            <Column 
              key={columnId} 
              id={columnId} 
              items={(tasks[columnId] || []).map((t) => t._id)} 
              tasks={tasks[columnId] || []} 
              projectId={projectId}
            />
          ))}
          <DragOverlay>
            {activeId && <Task task={activeTask} />}
          </DragOverlay>
        </DndContextWithNoSSR>
      </div>
    </div>
  );
}

export default KanbanBoard;