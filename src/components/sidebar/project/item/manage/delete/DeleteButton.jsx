const DeleteButton = ({ projectId, closeModal, refreshProjects, userId }) => {
  const clickHandler = async () => {
    if (confirm("삭제하시겠습니까?")) {
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
        refreshProjects();
        closeModal();
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <button className="custom-button" style={{backgroundColor: "red"}} onClick={clickHandler}>프로젝트 삭제</button>
  );
}

export default DeleteButton;