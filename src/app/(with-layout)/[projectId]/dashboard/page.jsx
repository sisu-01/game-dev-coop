"use client";

import { usePathname } from 'next/navigation';
import styles from "./dashboard.module.css";
import CustomGantt from "@/components/dashboard/CustomGantt";
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const pathname = usePathname();
  const projectId = pathname?.split('/')[1];
  const [startAt, setStartAt] = useState();
  const [endAt, setEndAt] = useState();
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTasks = async () => {
    try {
      const response = await fetch(`/api/dashboard/init?projectId=${projectId}`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("message");
      }
      const data = await response.json();
      setStartAt(new Date(data.date.startAt));
      setEndAt(new Date(data.date.endAt));
      setUsers(data.users);
      setTasks(data.tasks);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
      getTasks();
  }, []);

  if (loading) return <div>...Loading</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        대시 보드
      </div>
      <div className={styles.content}>
        <div className="item-container">
          <CustomGantt
            startAt={startAt}
            endAt={endAt}
            users={users}
            tasks={tasks}
            setTasks={setTasks}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;