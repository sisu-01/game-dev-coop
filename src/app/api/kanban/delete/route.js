import { connectToDb } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Task from "@/models/task";

export const DELETE = async (request) => {
  if (request.method === "DELETE") {
    try {
      const { _id } = await request.json();
      if (!_id) {
        return NextResponse.json({ error: "error" }, { status: 400 });
      }
      await connectToDb();
      await Task.deleteOne({ _id });
      return NextResponse.json({ message: "delete success" }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "error" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }
};