import mongoose from "mongoose";

const UserProjectSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  nickname: { type: String, required: true, default: "닉네임" },
  role: { type: String, required: true, default: "member" }, // 예: member, admin 등
  job: { type: Number, required: true, default: 0 },
  iconColor: { type: String, required: true, default: "#000000" }, // 사용자 정의 색상 (예: Hex 코드)
  joinedAt: { type: Date, default: Date.now }
});

// 한 유저가 같은 프로젝트에 중복 등록되지 않도록 인덱스 설정
UserProjectSchema.index({ userId: 1, projectId: 1 }, { unique: true });
UserProjectSchema.index({ projectId: 1 });
UserProjectSchema.index({ userId: 1 });

export default mongoose.models.UserProject || mongoose.model("UserProject", UserProjectSchema);
