"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

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
      setProject(data.project);
      setUserId(data.userId._id);
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
    <div>
      <h1>서버에 초대되었습니다!</h1>
      <p>서버 이름: {project.name}</p>
      <p>초대를 수락하시겠습니까?</p>
      <button onClick={handleAccept}>수락</button>
      <button onClick={handleDecline}>거절</button>
    </div>
  );
}

const InvitePageWrapper = () => (
  <Suspense fallback={<p>Loading...</p>}>
    <InvitePage />
  </Suspense>
);

export default InvitePageWrapper;