import { useState } from "react";
import { JOBS_LONG_TITLE } from "@/constants/job";
import styles from "./modal.module.css";

const planning = {
  1000: "PD",
  1001: "시스템 기획자",
  1002: "레벨 기획자",
  1003: "사운드",
}
const programming = {
  2000: "TD",
  2001: "클라이언트 프로그래머",
  2002: "서버 프로그래머",
}
const art = {
  3000: "AD",
  3001: "캐릭터 원화가",
  3002: "배경 원화가",
  3003: "캐릭터 원화가",
  3004: "배경 원화가",
  3005: "캐릭터 모델러",
  3006: "배경 모델러",
  3007: "2D 애니메이터",
  3008: "3D 애니메이터",
  3009: "이펙터",
}

const Modal = (props) => {
  const {projectId, job, color, closeModal, refreshProjects, userId} = props;
  console.log(job);
  const [result, setResult] = useState(job || null);
  const [inputColor, setColor] = useState(color);

  const jobHandler = (e) => {
    setResult(e.target.value);
  }
  const colorHandler = (e) => {
    setColor(e.target.value);
  }
  const submitHandler = async () => {
    if (!result) {
      alert("역할군을 선택해주세요.");
      return false;
    }
    try {  
      const response = await fetch(`/api/project/color`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          projectId: projectId,
          job: result,
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
    <div className="item-wrapper">
      <div className="item-label">
        프로젝트 프로필
      </div>
      <div className={`item-container ${styles.modalWrapper}`}>
        <div>
          <label className="form-label">프로젝트 역할</label>
          <div className={styles.jobWrapper}>
            <select className="form-control" onChange={jobHandler} value={""}>
              <option>-기획-</option>
              {Object.entries(planning).map(([key, value]) => (<option key={key} value={key}>{value}</option>))}
            </select>
            <select className="form-control" onChange={jobHandler} value={""}>
              <option>-프로그래밍-</option>
              {Object.entries(programming).map(([key, value]) => (<option key={key} value={key}>{value}</option>))}
            </select>
            <select className="form-control" onChange={jobHandler} value={""}>
              <option>-아트-</option>
              {Object.entries(art).map(([key, value]) => (<option key={key} value={key}>{value}</option>))}
            </select>
          </div>
          <div className={styles.jobResult}>
            {result? (
              <>{JOBS_LONG_TITLE[result]}</>
            ) : "역할군을 선택해주세요."}
          </div>
        </div>
        <div>
          <label htmlFor="color" className="form-label">프로젝트 색상</label>
          <input type="color" defaultValue={color} onChange={colorHandler} id="color" className={`form-control ${styles.color}`}/>
        </div>
        <div className={styles.btnWrapper}>
          <button onClick={submitHandler}>저장</button>
          <button onClick={closeModal}>취소</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;