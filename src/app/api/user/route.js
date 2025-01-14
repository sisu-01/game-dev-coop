import { connectToDb } from "@/lib/mongoose";
import User from "@/models/user";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export const GET = async () => {
  const { user } = await auth();
  const email = user.email;
  await connectToDb();
  const userId = await User.findOne({ email }).select('_id'); // _id만 가져오기
  return NextResponse.json({ userId: userId });
}