import { connectToDb } from "@/lib/mongoose";
import Project from "@/models/project";
import UserProject from "@/models/user_project";
import User from "@/models/user";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  if (request.method === "GET") {
    try {
      const { searchParams } = new URL(request.url);
      const projectId = searchParams.get("projectId");
      if (!projectId) {
        return NextResponse.json({ error: "projectId 똑바로 주셈" }, { status: 400 });
      }
      await connectToDb();
      const project = await Project.findById(projectId)
      const users = await UserProject.find({ projectId }) // UserProject에서 특정 프로젝트 ID에 해당하는 사용자 찾기
      .populate({
        path: "userId", // userId를 populate하여 User 컬렉션에서 데이터 가져오기
        select: "_id name image", // 가져올 필드 선택
      })
      .exec();
      const simplifiedUsers = users.map((userProject) => ({
        _id: userProject.userId._id,
        name: userProject.userId.name,
        image: userProject.userId.image,
      }));
      const result = {
        ...project.toObject(), // 프로젝트 정보 포함
        users: simplifiedUsers, // 사용자의 간단한 정보 추가
      };
      return NextResponse.json({ message: "프로젝트 조회에 성공하였습니다.", result });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: "프로젝트 조회에 실패하였습니다." }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "Method Not Allowed" });
  }
};