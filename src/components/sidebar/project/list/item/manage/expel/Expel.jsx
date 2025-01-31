import styles from "./expel.module.css";

const Expel = ({ userId, projectId, getProjectInfo }) => {

  const expelHandler = async () => {
    if (confirm("추방할?")) {
      try {
        const response = await fetch(`/api/user/expel`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId: userId,
            projectId: projectId
          }),
        });
        if (!response.ok) {
          throw new Error("추방 에러");
        }
        alert("내보내기 성공");
        getProjectInfo();
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <button onClick={expelHandler}>─</button>
  );
}

export default Expel;