import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  endAt: { type: Date }
});

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);