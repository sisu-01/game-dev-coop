import { connectToDb } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Task from "@/models/task";

export const POST = async (request) => {
  if (request.method === "POST") {
    try {
      const { tasks } = await request.json();
      if (!tasks) {
        return NextResponse.json({ error: "error" }, { status: 400 });
      }
      await connectToDb();
      
      const bulkOps = tasks.map((task) => ({
        updateOne: {
          filter: { _id: task._id },
          update: { $set: { sequence: task.sequence, columnId: task.columnId } },
        },
      }));

      await Task.bulkWrite(bulkOps);
  
      return NextResponse.json({ message: "message"}, { status: 200});
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: "message" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }
};