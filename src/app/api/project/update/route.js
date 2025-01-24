import { connectToDb } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import UserProject from "@/models/user_project";
import Project from "@/models/project";

export const PUT = async (request) => {
  if (request.method === "PUT") {
    try {
      const { userId, projectId, name, startAt, endAt } = await request.json();
      if (!userId || !projectId || !name || !startAt || !endAt) {
        return NextResponse.json({ error: "파라미터 문제 발생" }, { status: 400 });
      }
      await connectToDb();
      const response = await UserProject.findOne({ userId: userId, projectId: projectId }).select({ _id: false, role: true});
      if (response.role === "admin") {
        await Project.updateOne({ _id: projectId }, {
          name, startAt, endAt
        })
        return NextResponse.json({ message: "수정 성공" }, { satatus: 200 });
      } else {
        return NextResponse.json({ error: "님 관리자 아니심;" }, { status: 401 });
      }
      return NextResponse.json({ message: "message"}, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: "message" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }
};