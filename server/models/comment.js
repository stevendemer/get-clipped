import mongoose, { Schema } from "mongoose";

const commentSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
    maxLength: [100, "Comments can't exceed 100 characters"],
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  clipId: {
    type: Schema.Types.ObjectId,
    ref: "Clip",
  },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
