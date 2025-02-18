import Issue from "./issue/Issue";
import Profile from "./profile/Profile";
import Client from "./project/Project";
import styles from "./sidebar.module.css";
import ProjectProvider from "@/context/ProjectContext";

const Sidebar = () => {
  return (
    <div className={styles.container}>
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