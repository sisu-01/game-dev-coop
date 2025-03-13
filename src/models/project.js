import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 15 },
  description: { type: String },
  startAt: { type: Date, required: true }, 
  endAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
ProjectSchema.index({ startAt: 1, endAt: 1 });

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);