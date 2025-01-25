import { connectToDb } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import User from "@/models/user";

export const GET = async () => {
  const { user } = await auth();
  const email = user.email;
  await connectToDb();
  const userId = await User.findOne({ email }).select('_id'); // _id만 가져오기
  return NextResponse.json({ userId: userId });
}