"use server";

export const checkUserProjectAccess = async (email, projectId) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/project/auth?email=${email}`, {
      method: "GET",
    });
    const data = await response.json();
    return data.hasAccess;
  } catch (error) {
    console.error(error);
    return false;
  }
}