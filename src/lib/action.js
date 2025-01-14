"use server";

import { signOut } from "./auth";
import { connectToDb } from "./mongoose";
import User from "@/models/user";
import { auth } from "@/lib/auth";

export const handleLogin = async (user) => {
  try {
    // MongoDB 연결 설정
    await connectToDb();
    // GitHub ID로 기존 유저를 찾기
    let existingUser = await User.findOne({ email: user.email });
    // 유저가 없으면 새로 생성
    if (!existingUser) {
      existingUser = await User.create({
        name: user.name,
        email: user.email,
        image: user.image,
      });
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export const handleLogout = async () => {
  await signOut();
}

export const getUserId = async () => {
  const { user } = await auth();
  const email = user.email;
  await connectToDb();
  const userId = await User.findOne({ email }).select('_id'); // _id만 가져오기
  return userId;
}