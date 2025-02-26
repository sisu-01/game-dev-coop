import { connectToDb } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Task from "@/models/task";

export const PUT = async (request) => {
  if (request.method === "PUT") {
    try {
      const { _id, userId, job, title, startAt, endAt, columnId, work1, work2, projectId } = await request.json();
      if (!userId || !title || !startAt || !endAt || !_id) {
        return NextResponse.json({ error: "필수 필드를 모두 입력해야 합니다." }, { status: 400 });
      }
      await connectToDb();

      // 기존 Task를 찾아서 업데이트
      const updatedTask = await Task.findByIdAndUpdate(
        _id,
        { job, title, startAt, endAt, userId, columnId, projectId, work1, work2 },
        { new: false }
      );

      if (!updatedTask) {
        return NextResponse.json({ error: "Task를 찾을 수 없습니다." }, { status: 404 });
      }

      return NextResponse.json({ message: "Task 업데이트 성공", task: updatedTask }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "서버 오류" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }
};
