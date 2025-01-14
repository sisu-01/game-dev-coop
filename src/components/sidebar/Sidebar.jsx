import Issue from "./issue/Issue";
import Profile from "./profile/Profile";
import Project from "./project/Project";
import styles from "./sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <Profile/>
      <Issue/>
      <Project/>
    </div>
  );
}

export default Sidebar;