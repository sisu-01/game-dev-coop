// import { connectToDb } from "@/lib/mongoose";
// import "@/models/project"; //이거 있어야 populate 됨
// import UserProject from "@/models/user_project";
// import Button from "./createButton/CreateButton";
// import List from "./list/List";
// import styles from "./project.module.css";
// import { getUserId } from "@/lib/action";

// const getUserProjects = async (userId) => {
//   try {
//     await connectToDb();
//     const userProjects = await UserProject.find({ userId })
//       .populate("projectId", "name _id") // Project의 이름만 가져오기
//       .exec();

//     // 프로젝트 정보 포함하여 반환
//     const projects = userProjects.map((userProject) => ({
//       id: userProject.projectId._id.toString(), // 프로젝트 ID
//       name: userProject.projectId.name, // 프로젝트 이름
//       color: userProject.iconColor, // 개인 색상
//       role: userProject.role, // 역할
//     }));

//     return projects;
//   } catch (error) {
//     console.error("Error fetching user projects:", error);
//     throw new Error("Failed to fetch user projects");
//   }
// };

// const Project = async () => {
//   const userId = await getUserId();
//   const projects = await getUserProjects(userId);

//   return (
//     <div className={styles.container}>
//       <div className={styles.label}>
//         프로젝트
//       </div>
//       <div className={styles.list}>
//         <List projects={projects} />
//       </div>
//       <div className={styles.btnWrapper}>
//         <Button/>
//       </div>
//     </div>
//   );
// }

// export default Project;