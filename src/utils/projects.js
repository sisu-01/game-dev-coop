"use server";

export const checkUserProjectAccess = async (email, projectId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/project/auth?email=${email}`, {
      method: "GET",
    });
    const data = await response.json();
    return data.hasAccess;
  } catch (error) {
    console.error(error);
    return false;
  }
}