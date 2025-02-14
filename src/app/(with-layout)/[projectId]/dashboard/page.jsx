"use client";

import GanttComponent from "@/components/dashboard/GanttComponent";
import styles from "./dashboard.module.css";
import GstcComponent from "@/components/dashboard/GstcComponent";

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        대시 보드
      </div>
      <div className={styles.content}>
        <div className="item-container">
          <GstcComponent />
          {/* <br/><br/>
          <GanttComponent /> */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;