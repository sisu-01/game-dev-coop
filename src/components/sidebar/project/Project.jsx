import Button from "./button/Button";
import List from "./list/List";
import styles from "./project.module.css";

const Project = () => {

  const projects = [
    {"id": 1, "name": "프로젝트 1", color: "#ff0000"},
    {"id": 2, "name": "프로젝트 2", color: "#00ff00"},
    {"id": 3, "name": "프로젝트 3", color: "#0000ff"},
  ]

  return (
    <div className={styles.container}>
      <div className={styles.label}>
        프로젝트
      </div>
      <div className={styles.list}>
        <List projects={projects} />
      </div>
      <div className={styles.btnWrapper}>
        <Button/>
      </div>
    </div>
  );
}

export default Project;