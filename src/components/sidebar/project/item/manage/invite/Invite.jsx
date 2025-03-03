"use client";

import styles from "./invite.module.css";

const Invite = ({ projectId }) => {

  // const clickHandler = () => {
  //   //대충 생성 함수
  //   const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  //   const path = "/invite";
  //   const param = `?id=${projectId}`;
  //   setInviteUrl(baseUrl+path+param);
  // }

  const copyToClipboard = () => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    const path = "/invite";
    const param = `?id=${projectId}`;
    const inviteUrl = baseUrl+path+param;
    navigator.clipboard.writeText(inviteUrl).then(() => {
      alert('초대 URL이 복사되었습니다!');
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.buttonWrapper}>
        {/* <button className="plus-button" onClick={() => clickHandler()}>✚</button> */}
        <button className="plus-button" onClick={() => copyToClipboard()}>✚</button>
      </div>
      {/* {inviteUrl && (
        <div className={styles.inviteWrapper}>
          <span>{inviteUrl}</span>
          <button className="custom-button" style={{backgroundColor: "#7f7f7f"}} onClick={() => copyToClipboard()}>복사</button>
        </div>
      )} */}
    </div>
  );
}

export default Invite;