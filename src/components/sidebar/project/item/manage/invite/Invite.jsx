"use client";

import { useState } from "react";
import styles from "./invite.module.css";

const Invite = ({ projectId }) => {
  const [inviteUrl, setInviteUrl] = useState("");

  const clickHandler = () => {
    //대충 생성 함수
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    const path = "/invite";
    const param = `?id=${projectId}`;
    setInviteUrl(baseUrl+path+param);
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteUrl).then(() => {
      alert('초대 URL이 복사되었습니다!');
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.buttonWrapper}>
        <button className="plus-button" onClick={() => clickHandler()}>✚</button>
      </div>
      {inviteUrl && (
        <div className={styles.inviteWrapper}>
          <p>초대 Url: {inviteUrl}</p>
          <button onClick={() => copyToClipboard()}>복사</button>
        </div>
      )}
    </div>
  );
}

export default Invite;