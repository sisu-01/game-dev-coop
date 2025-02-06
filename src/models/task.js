import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  columnId: { type: String, enum: ['todo', 'process', 'done'], required: true }, // 컬럼 추가
  startAt: { type: Date }, 
  endAt: { type: Date },
  sequence: { type: Number, required: true }, // 같은 column 내에서 정렬용
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true }); // createdAt, updatedAt 자동 관리

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);