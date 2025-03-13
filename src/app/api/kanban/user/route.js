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

      const users = await UserProject.find({ projectId })
        .select("-_id userId nickname iconColor")
        .sort({ job: 1 })
        .exec();

        return NextResponse.json({ message: "message", users }, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: "message" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }
};