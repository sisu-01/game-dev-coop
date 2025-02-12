import { connectToDb } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Project from "@/models/project";
import UserProject from "@/models/user_project";

export const POST = async (request) => {
  if (request.method === "POST") {
    try {
      await connectToDb();
      const { userId, name, startAt, endAt } = await request.json();
      const newProject = await Project.create({ name, startAt, endAt });
      await UserProject.create({
        userId: userId,
        projectId: newProject._id, // 새로 생성된 프로젝트의 _id
        role: "admin",
        iconColor: "#000000" // 기본 아이콘 색상
      });
      return NextResponse.json({ message: "프로젝트가 성공적으로 생성되었습니다." });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "프로젝트 생성에 실패했습니다." });
    }
  } else {
    return NextResponse.json({ error: "Method Not Allowed" });
  }
}