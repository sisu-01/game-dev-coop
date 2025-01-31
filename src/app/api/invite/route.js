import { connectToDb } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import Project from "@/models/project";
import User from "@/models/user";
import UserProject from "@/models/user_project";

export const GET = async (request) => {
  if (request.method === "GET") {
    try {
      const { searchParams } = new URL(request.url);
      const projectId = searchParams.get("projectId");
      if (!projectId) {
        return NextResponse.json({ error: "유효하지않은 초대코드." }, { status: 404 });
      }
      const { user } = await auth();
      const email = user.email;

      await connectToDb();

      const project = await Project.findById(projectId);
      const userId = await User.findOne({ email }).select('_id');

      if (!project) return NextResponse.json({ error: "프로젝트 없삼" }, { status: 404 });
      if (!userId) return NextResponse.json({ error: "유저 없삼" }, { status: 403 });

      const isAlready = await UserProject.findOne({ projectId, userId });
      if (isAlready) {
        return NextResponse.json({ message: "이미 초대돼있음..", project, userId, isAlready: true }, { status: 200 });
      } else {
        return NextResponse.json({ message: "프로젝트 있네용 ㅎ", project, userId, isAlready: false }, { status: 200 });
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: "message" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }
};

export const POST = async (request) => {
  if (request.method === "POST") {
    try {
      const { userId, projectId } = await request.json();
      
      if (!projectId) return NextResponse.json({ error: "프로젝트 없삼" }, { status: 404 });
      if (!userId) return NextResponse.json({ error: "유저 없삼" }, { status: 403 });

      await connectToDb();
      
      await UserProject.create({
        userId: userId,
        projectId: projectId,
        iconColor: "#000000",
      });

      return NextResponse.json({ message: "success"}, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "message" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }
};