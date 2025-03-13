import { connectToDb } from "@/lib/mongoose";
import Project from "@/models/project";
import UserProject from "@/models/user_project";
import User from "@/models/user";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  if (request.method === "GET") {
    try {
      const { searchParams } = new URL(request.url);
      const projectId = searchParams.get("projectId");
      if (!projectId) {
        return NextResponse.json({ error: "projectId 똑바로 주셈" }, { status: 400 });
      }
      await connectToDb();
      const project = await Project.findById(projectId)
      const users = await UserProject.find({ projectId }).select("-_id userId iconColor nickname").exec();
      const result = {
        ...project.toObject(), // 프로젝트 정보 포함
        users, // 사용자의 간단한 정보 추가
      };
      return NextResponse.json({ message: "프로젝트 조회에 성공하였습니다.", result });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: "프로젝트 조회에 실패하였습니다." }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "Method Not Allowed" });
  }
};