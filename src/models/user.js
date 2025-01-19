import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, },
  email: { type: String, required: true, unique: true },
  image: { type: String, },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  projects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project", // Project 컬렉션의 참조
  }],
});

export default mongoose.models.User || mongoose.model("User", UserSchema);