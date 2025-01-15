import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  startAt: { type: Date }, 
  endAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserProject', select: 'userId' }]
});

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);