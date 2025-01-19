import { connectToDb } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Project from "@/models/project";

export const GET = async (request) => {
  if (request.method === "GET") {
    try {
      const { searchParams } = new URL(request.url);
      const projectId = searchParams.get("projectId");
      if (!projectId) {
        return NextResponse.json({ error: "유효하지않은 초대코드." }, { status: 404 });
      }
      await connectToDb();
      const project = await Project.findById(projectId);
      
      if (!project) {
        return NextResponse.json({ error: "프로젝트 못 찾음." }, { status: 404 });
      }
      return NextResponse.json({ message: "프로젝트 있네용 ㅎ", project }, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: "message" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }
};