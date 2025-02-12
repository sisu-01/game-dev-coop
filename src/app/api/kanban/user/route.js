import { connectToDb } from "@/lib/mongoose";
import UserProject from "@/models/user_project";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  if (request.method === "GET") {
    try {
      await connectToDb();
      const { searchParams } = new URL(request.url);
      const projectId = searchParams.get("projectId");
      if (!projectId) {
        return NextResponse.json({ error: "error" }, { status: 400 });
      }

      const users = await UserProject.find({ projectId }) // UserProject에서 특정 프로젝트 ID에 해당하는 사용자 찾기
        .populate({
          path: "userId", // userId를 populate하여 User 컬렉션에서 데이터 가져오기
          select: "_id name image", // 가져올 필드 선택
        })
        .exec();
      const simplifiedUsers = users.map((userProject) => ({
        _id: userProject.userId._id,
        name: userProject.userId.name,
        image: userProject.userId.image,
      }));

      return NextResponse.json({ message: "message", users: simplifiedUsers }, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: "message" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }
};