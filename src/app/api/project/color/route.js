import { connectToDb } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import UserProject from "@/models/user_project";

export const PUT = async (request) => {
  if (request.method === "PUT") {
    try {
      const { userId, projectId, color } = await request.json();
      console.log(userId, projectId);
      if (!projectId || !userId) {
        return NextResponse.json({ error: "에러" }, { status: 400 });
      }
      await connectToDb();
      await UserProject.updateOne({ userId: userId, projectId: projectId }, {
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