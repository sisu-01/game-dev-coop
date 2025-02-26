import { connectToDb } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Task from "@/models/task";

export const GET = async (request) => {
  if (request.method === "GET") {
    try {
      await connectToDb();
      const { searchParams } = new URL(request.url);
      const projectId = searchParams.get("projectId");
      if (!projectId) {
        return NextResponse.json({ error: "error" }, { status: 400 });
      }
      const tasks = await Task.find({ projectId }) // 특정 프로젝트의 Task 목록 조회
        .populate("userId", "name image") // userId를 이용해 User의 name, image 가져오기
        .sort({ sequence: 1 }) // sequence 기준으로 정렬
        .exec();
      const simplifiedTasks = tasks.map(({ _id, title, columnId, startAt, endAt, work1, work2, sequence, userId }) => ({
        _id,
        title,
        columnId,
        startAt,
        endAt,
        work1,
        work2,
        sequence,
        user: {
          _id: userId._id,
          name: userId.name,
          image: userId.image,
        },
      }));
      
      return NextResponse.json({ message: "message", tasks: simplifiedTasks }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "message" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }
};