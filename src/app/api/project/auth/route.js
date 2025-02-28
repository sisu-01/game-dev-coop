import { connectToDb } from "@/lib/mongoose";
import User from "@/models/user";
import UserProject from "@/models/user_project";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  if (request.method === "GET") {
    try {
      const { searchParams } = new URL(request.url);
      const email = searchParams.get("email");
      if (!email) {
        return NextResponse.json({ error: "message" }, { status: 400 });
      }
      await connectToDb();
      const user = await User.findOne({ email });
      const hasAccess = await UserProject.exists({ userId: user._id });
      return NextResponse.json({ message: "message", hasAccess: hasAccess ? true : false }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "message" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }
};