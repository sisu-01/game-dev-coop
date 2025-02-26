import { connectToDb } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Task from "@/models/task";

export const GET = async (request) => {
  if (request.method === "GET") {
    try {
      const { searchParams } = new URL(request.url);
      const userId = searchParams.get("userId");
      if (!userId) {
        return NextResponse.json({ error: "error" }, { status: 400 });
      }
      await connectToDb();
      const taskList = await Task.find({ userId: userId, columnId: "process" });
      return NextResponse.json({ message: "success", taskList });
    } catch (error) {
      return NextResponse.json({ error: "error" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }
};