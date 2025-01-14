"use client";

import { createContext } from "react";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  return (
    <UserContext.Provider value={{"name":"gildong"}}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;