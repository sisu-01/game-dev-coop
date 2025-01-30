import Issue from "./issue/Issue";
import Profile from "./profile/Profile";
import Project from "./project/Project";
import Client from "./project/Client";
import styles from "./sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={`layout-container ${styles.container}`}>
      <Profile/>
      <Issue/>
      {/* <Project/> */}
      <Client/>
    </div>
  );
}

export default Sidebar;