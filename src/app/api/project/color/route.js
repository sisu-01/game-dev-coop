import { connectToDb } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import UserProject from "@/models/user_project";

export const PUT = async (request) => {
  if (request.method === "PUT") {
    try {
      const { userId, nickname, job, projectId, color } = await request.json();
      if (!projectId || !nickname || !userId || !job) {
        return NextResponse.json({ error: "에러" }, { status: 400 });
      }
      await connectToDb();
      await UserProject.updateOne({ userId: userId, projectId: projectId }, {
        nickname: nickname,
        job: job,
        iconColor: color
      })
      return NextResponse.json({ message: "message" }, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: "message" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }
};