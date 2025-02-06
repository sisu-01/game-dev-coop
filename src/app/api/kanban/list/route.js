import { connectToDb } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Task from "@/models/task";

export const GET = async (request) => {
  if (request.method === "GET") {
    try {
      const { searchParams } = new URL(request.url);
      const projectId = searchParams.get("projectId");
      if (!projectId) {
        return NextResponse.json({ error: "error" }, { status: 400 });
      }
      const tasks = await Task.find({ projectId });
      await connectToDb();
      return NextResponse.json({ message: "message", tasks }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "message" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }
};