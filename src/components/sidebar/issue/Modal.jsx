import styles from "./modal.module.css";
import Task from "./task/Task";

const Modal = ({ taskList }) => {
  console.log(taskList);
  return (
    <div className="item-wrapper">
      <div className="item-label">
        진행중 작업
      </div>
      <div className="item-container">
        <div className={styles.taskWrapper}>
          {taskList.map((task) => (
            <Task key={task._id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Modal;