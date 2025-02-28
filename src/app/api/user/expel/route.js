import { connectToDb } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import UserProject from "@/models/user_project";
import Task from "@/models/task";

export const DELETE = async (request) => {
  if (request.method === "DELETE") {
    try {
      const { userId, projectId } = await request.json();
      if (!userId || !projectId) {
        return NextResponse.json({ error: "추방 에러" }, { status: 400 });
      }
      await connectToDb();
      await UserProject.findOneAndDelete({ userId: userId, projectId: projectId });
      await Task.findOneAndDelete({ userId: userId, projectId: projectId });
      
      return NextResponse.json({ message: "추방 성공" }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "추방 에러" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }
};