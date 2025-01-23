import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

const DeleteButton = ({ projectId }) => {
  const { userId } = useContext(UserContext);

  const clickHandler = async () => {
    if (true) {
    //if (confirm("삭제할?")) {
      try {
        const response = await fetch(`/api/project/delete`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            projectId: projectId
          }),
        });
        if (!response.ok) {
          throw new Error("프로젝트 삭제 실패");
        }
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <button onClick={clickHandler}>프로젝트 삭제</button>
  );
}

export default DeleteButton;