import mongoose from "mongoose";
import { connectToDb } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Task from "@/models/task";
import UserProject from "@/models/user_project";

export const GET = async (request) => {
  if (request.method === "GET") {
    try {
      await connectToDb();
      const { searchParams } = new URL(request.url);
      const projectId = searchParams.get("projectId");
      if (!projectId) {
        return NextResponse.json({ error: "error" }, { status: 400 });
      }

      const tasks = await Task.aggregate([
        { $match: { projectId: new mongoose.Types.ObjectId(projectId) } },
        { $sort: { sequence: 1 } },
        {
          $lookup: {
            from: "userprojects", // UserProject 컬렉션
            let: { userId: "$userId", projectId: "$projectId" }, // 로컬 필드 변수로 전달
            pipeline: [
              { $match: { 
                  $expr: { 
                    $and: [
                      { $eq: ["$userId", "$$userId"] },  // userId 매칭
                      { $eq: ["$projectId", "$$projectId"] } // projectId 매칭
                    ] 
                  }
              }}
            ],
            as: "userProject",
          },
        },
        { $unwind: { path: "$userProject", preserveNullAndEmptyArrays: true } },
        {
          $project: {
            _id: 1,
            title: 1,
            columnId: 1,
            job: 1,
            startAt: 1,
            endAt: 1,
            sequence: 1,
            projectId: 1,
            userId: 1,
            work1: 1,
            work2: 1,
            "userProject.nickname": 1,
            "userProject.iconColor": 1
          },
        },
      ]);

      return NextResponse.json({ message: "message", tasks }, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: "message" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }
};