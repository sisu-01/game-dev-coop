import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  columnId: { type: String, enum: ['todo', 'process', 'done'], required: true }, // 컬럼 추가
  job: { type: String, enum: ['planning', 'programming', 'art'], required: true }, // 컬럼 추가
  title: { type: String, required: true },
  startAt: { type: Date, required: true }, 
  endAt: { type: Date, required: true },
  work1: { type: String },
  work2: { type: String },
  sequence: { type: Number, required: true }, // 같은 column 내에서 정렬용
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
}, { timestamps: true }); // createdAt, updatedAt 자동 관리

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);