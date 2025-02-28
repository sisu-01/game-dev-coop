import { connectToDb } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Project from "@/models/project";
import Task from "@/models/task";
import UserProject from "@/models/user_project";

export const GET = async (request) => {
  if (request.method === "GET") {
    try {
      await connectToDb();
      const { searchParams } = new URL(request.url);
      const projectId = searchParams.get("projectId");
      if (!projectId) {
        return NextResponse.json({ error: "error" }, { status: 400 });
      }

      const date = await Project.findById({ _id: projectId }).select("startAt endAt -_id");
      const users = await UserProject.find({ projectId }) // UserProject에서 특정 프로젝트 ID에 해당하는 사용자 찾기
        .populate({
          path: "userId", // userId를 populate하여 User 컬렉션에서 데이터 가져오기
          select: "_id name image", // 가져올 필드 선택
        })
        .sort({ job: 1 })
        .exec();
      const simplifiedUsers = users.map((userProject) => ({
        _id: userProject.userId._id,
        name: userProject.userId.name,
        image: userProject.userId.image,
        job: userProject.job,
      }));
      const tasks = await Task.find({ projectId });

      return NextResponse.json({ message: "message", date, users: simplifiedUsers, tasks }, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: "message" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }
};