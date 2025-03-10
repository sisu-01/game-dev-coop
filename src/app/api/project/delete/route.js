import { connectToDb } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import UserProject from "@/models/user_project";
import Project from "@/models/project";
import Task from "@/models/task";

export const DELETE = async (request) => {
  if (request.method === "DELETE") {
    try {
      const { userId, projectId } = await request.json();
      
      if (!projectId || !userId) {
        return NextResponse.json({ error: "삭제 에러" }, { status: 400 });
      }
      await connectToDb();
      const response = await UserProject.findOne({ userId: userId, projectId: projectId }).select({ _id: false, role: true});
      if (response.role === "admin") {
        await Project.findByIdAndDelete({ _id: projectId });
        //await UserProject.findOneAndDelete({ userId: userId, projectId: projectId });
        await UserProject.deleteMany({ projectId });
        await Task.deleteMany({ projectId });
        return NextResponse.json({ message: "삭제 성공" }, { status: 200 });
      } else {
        return NextResponse.json({ error: "님 관리자 아니심;" }, { status: 401 });
      }
    } catch (error) {
      return NextResponse.json({ error: "삭제 실패" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }
};