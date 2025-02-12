"use client";

import { createContext, useState, useCallback } from "react";

export const ProjectContext = createContext(null);

const ProjectProvider = ({ children }) => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refreshProjects = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  return (
    <ProjectContext.Provider value={{ refreshProjects, refreshTrigger }}>
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectProvider;

//export const useProject = () => useContext(ProjectContext);