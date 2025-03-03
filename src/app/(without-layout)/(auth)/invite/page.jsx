"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import styles from "./invite.module.css";

const InvitePage = () => {
  const searchParams = useSearchParams();
  const projectId = searchParams.get('id');
  const [project, setProject] = useState(null);
  const [userId, setUserId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const fetchInvite = async () => {
    try {
      const response = await fetch(`/api/invite?projectId=${projectId}`);
      if (!response.ok) {
        throw new Error("초대 실패");
      }
      const data = await response.json();
      if (data.isAlready) {
        alert("참가 완료");
        router.push(`/`);
      } else {
        setProject(data.project);
        setUserId(data.userId._id);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  useEffect(() => {
    fetchInvite();
  }, []);

  const handleAccept = async () => {
    try {
      const response = await fetch(`/api/invite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: userId,
          projectId: project._id,
        }),
      });
      if (!response.ok) {
        throw new Error("message");
      }
      router.push(`/`);
    } catch (error) {
      console.error(error);
    }
  }
  const handleDecline = () => {
    router.push("/");
  }

  if (errorMessage) return <p>{errorMessage}</p>;
  if (!project) return <p>...Loading</p>;
  
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>서버에 초대되었습니다!</h1>
        <p className={styles.description}>서버 이름: {project.name}</p>
        <p className={styles.description}>초대를 수락하시겠습니까?</p>
        <div className={styles.btnWrapper}>
          <button className={styles.button} onClick={handleAccept}>수락</button>
          <button className={styles.button} onClick={handleDecline}>거절</button>
        </div>
      </div>
    </div>
  );
}

const InvitePageWrapper = () => (
  <Suspense fallback={<p>Loading...</p>}>
    <InvitePage />
  </Suspense>
);

export default InvitePageWrapper;