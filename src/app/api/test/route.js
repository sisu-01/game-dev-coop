import { connectToDb } from "@/lib/mongoose";
import User from "@/models/user";
import Project from "@/models/project";
import UserProject from "@/models/user_project";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export const GET = async () => {
  const { user } = await auth();
  const email = user.email;
  await connectToDb();
  const userId = await User.findOne({ email }).select('_id'); // _id만 가져오기
  return NextResponse.json({ userId: userId });
}

export const POST = async (request) => {
  if (request.method === "POST") {
    try {
      await connectToDb();
      const { userId, name } = await request.json();
      const newProject = await Project.create({ name });
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