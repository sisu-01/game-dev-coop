import { useState } from "react";
import styles from "./colorPicker.module.css";

const ColorPicker = ({ color }) => {
  console.log("color picker");
  const [open, setOpen] = useState(false);
  const [inputColor, setColor] = useState(color);

  const colorHandler = (e) => {
    setColor(e.target.value);
  }
  const submitHandler = async () => {
    const response = await fetch(`/api/project/`, {
      method: "POST",
    });
    if (!response.ok) {
      console.log("tq");
    }
  }

  return (
    <>
      <div className={styles.colorBox} style={{backgroundColor: color}} onClick={() => {setOpen(prev => !prev)}}></div>
      {open && (
        <div className={styles.colorPicker}>
          컬러피커
          <div>
            <input type="color" defaultValue={color} onChange={colorHandler}/>
          </div>
          <div>
            <button onClick={submitHandler}>저장</button>
            <button onClick={() => setOpen(false)}>취소</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ColorPicker;