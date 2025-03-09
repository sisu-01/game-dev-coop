import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, },
  email: { type: String, required: true, unique: true },
  image: { type: String, },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
UserSchema.index({ email: 1 });

export default mongoose.models.User || mongoose.model("User", UserSchema);