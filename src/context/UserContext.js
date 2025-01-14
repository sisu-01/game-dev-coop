"use client";

import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch("/api/user", {
        method: "GET"
      }); // 서버에서 유저 정보 가져오기
      const data = await response.json();
      setUserId(data.userId);
    };

    fetchUserData();
  }, []);  
  return (
    <UserContext.Provider value={{userId: userId}}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;