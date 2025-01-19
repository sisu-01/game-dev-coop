"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const InvitePage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [inviteData, setInviteData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchInvite = async () => {
    try {
      const response = await fetch(`/api/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("초대 실패");
        setErrorMessage("초대 실패");
      }
      // const data = await response.json():
      const a = {"serverId": "tq"}
      setInviteData(a);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  useEffect(() => {
    fetchInvite();
  }, []);

  if (errorMessage) return <p>{errorMessage}</p>;
  if (!inviteData) return <p>...Loading</p>;
  
  return (
    <div>
      <h1>서버에 초대되었습니다!</h1>
      <p>서버 이름: {inviteData.serverId}</p>
      <p>초대를 수락하시겠습니까?</p>
      <button>수락</button>
      <button>거절</button>
    </div>
  );
}

export default InvitePage;