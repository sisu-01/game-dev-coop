import { connectToDb } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Task from "@/models/task";

export const POST = async (request) => {
  if (request.method === "POST") {
    try {
      const { userId, title, columnId } = await request.json();
      if (!userId || !title) {
        return NextResponse.json({ error: "error" }, { status: 400 });
      }
      await connectToDb();
      const tasksInColumn = await Task.find({ columnId }).sort({ sequence: 1 });
      await Task.updateMany(
        { columnId },
        { $inc: { sequence: 1 } } // 모든 task의 sequence 값을 +1
      );
      const newTask = await Task.create({ title, userId, columnId, sequence: 0 });
      return NextResponse.json({ message: "message" }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "message" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }
};