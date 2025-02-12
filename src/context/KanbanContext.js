"use client";

import { createContext, useState, useCallback } from "react";

export const KanbanContext = createContext(null);

const KanbanProvider = ({ children }) => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refreshTasks = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  return (
    <KanbanContext.Provider value={{ refreshTasks, refreshTrigger }}>
      {children}
    </KanbanContext.Provider>
  );
};

export default KanbanProvider;

//export const useProject = () => useContext(ProjectContext);