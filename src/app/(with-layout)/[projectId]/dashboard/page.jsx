"use client";

import styles from "./dashboard.module.css";
import CustomGantt from "@/components/dashboard/CustomGantt";

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        대시 보드
      </div>
      <div className={styles.content}>
        <div className="item-container">
          <CustomGantt />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;