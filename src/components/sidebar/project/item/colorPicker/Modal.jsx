import { useState } from "react";
import styles from "./colorPicker.module.css";

const Modal = (props) => {
  const {projectId, color, closeModal, refreshProjects, userId} = props;
  const [inputColor, setColor] = useState(color);

  const colorHandler = (e) => {
    setColor(e.target.value);
  }
  const submitHandler = async () => {
    try {  
      const response = await fetch(`/api/project/color`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          projectId: projectId,
          color: inputColor,
        }),
      });
      if (!response.ok) {
        console.log("문제가 발생했습니다.");
      }
      refreshProjects();
      closeModal();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.colorPicker}>
      컬러피커
      <div>
        <input type="color" defaultValue={color} onChange={colorHandler}/>
      </div>
      <div>
        <button onClick={submitHandler}>저장</button>
        <button onClick={closeModal}>취소</button>
      </div>
    </div>
  );
}

export default Modal;