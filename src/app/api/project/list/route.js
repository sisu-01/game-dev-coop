import { connectToDb } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import "@/models/project";
import UserProject from "@/models/user_project";

export const GET = async (request) => {
  if (request.method === "GET") {
    try {
      const { searchParams } = new URL(request.url);
      const userId = searchParams.get("userId");
      if (!userId) {
        return NextResponse.json({ error: "userId가 제공되지 않았습니다." }, { status: 400 });
      }
      await connectToDb();
      const userProjects = await UserProject.find({ userId })
        .populate("projectId", "name _id") // Project의 이름만 가져오기
        .exec();
      
      // 프로젝트 정보 포함하여 반환
      const projects = userProjects.map((userProject) => ({
        id: userProject.projectId._id.toString(), // 프로젝트 ID
        name: userProject.projectId.name, // 프로젝트 이름
        nickname: userProject.nickname, // 개인 닉네임
        job: userProject.job, // 개인 직군
        color: userProject.iconColor, // 개인 색상
        role: userProject.role, // 역할
      }));
      return NextResponse.json({ message: "프로젝트 조회에 성공하였습니다.", projects });
    } catch (error) {
      return NextResponse.json({ error: "프로젝트 조회에 실패하였습니다.." }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "Method Not Allowed" });
  }
}