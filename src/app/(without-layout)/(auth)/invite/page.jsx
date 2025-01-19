"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const InvitePage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [inviteData, setInviteData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const fetchInvite = async () => {
    try {
      const response = await fetch(`/api/invite?projectId=${id}`);
      if (!response.ok) {
        throw new Error("초대 실패");
        setErrorMessage("초대 실패");
      }
      const data = await response.json();
      setInviteData(data.project);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  useEffect(() => {
    fetchInvite();
  }, []);

  const handleAccept = () => {
    console.log("좋아");
  }
  const handleDecline = () => {
    router.push("/");
  }

  if (errorMessage) return <p>{errorMessage}</p>;
  if (!inviteData) return <p>...Loading</p>;
  
  return (
    <div>
      <h1>서버에 초대되었습니다!</h1>
      <p>서버 이름: {inviteData.name}</p>
      <p>초대를 수락하시겠습니까?</p>
      <button onClick={handleAccept}>수락</button>
      <button onClick={handleDecline}>거절</button>
    </div>
  );
}

export default InvitePage;