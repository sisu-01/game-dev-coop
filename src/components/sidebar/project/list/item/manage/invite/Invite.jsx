"use client";

import { useState } from "react";
import styles from "./invite.module.css";

const Invite = () => {
  const [inviteUrl, setInviteUrl] = useState("");

  const clickHandler = () => {
    setInviteUrl("끄아악");
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteUrl).then(() => {
      alert('초대 URL이 복사되었습니다!');
    });
  }

  return (
    <div>
      <button onClick={() => clickHandler()}>+</button>
      {inviteUrl && (
        <div>
          <p>초대 Url: {inviteUrl}</p>
          <button onClick={() => copyToClipboard()}>복사</button>
        </div>
      )}
    </div>
  );
}

export default Invite;