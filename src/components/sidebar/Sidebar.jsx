import Manager from "./manager/Manager";
import Profile from "./profile/Profile";
import Project from "./project/Project";
import styles from "./sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <Profile/>
      <Manager/>
      <Project/>
    </div>
  );
}

export default Sidebar;