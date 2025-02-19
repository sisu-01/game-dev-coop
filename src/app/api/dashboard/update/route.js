import { connectToDb } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Task from "@/models/task";

export const PUT = async (request) => {
  if (request.method === "PUT") {
    try {
      await connectToDb();
      const { updatedTask } = await request.json();
      if (!updatedTask) {
        return NextResponse.json({ error: "error" }, { status: 400 });
      }
      await Task.findByIdAndUpdate(
        updatedTask._id,
        updatedTask
      );
      return NextResponse.json({ message: "message" }, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: "message" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }
};