import Issue from "./issue/Issue";
import Profile from "./profile/Profile";
import Client from "./project/Client";
import styles from "./sidebar.module.css";
import ProjectProvider from "@/context/ProjectContext";

const Sidebar = () => {
  return (
    <div className={`layout-container ${styles.container}`}>
      <Profile/>
      <Issue/>
      {/* <Project/> */}
      <ProjectProvider>
        <Client/>
      </ProjectProvider>
    </div>
  );
}

export default Sidebar;