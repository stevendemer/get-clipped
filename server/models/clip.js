import mongoose, { Schema } from "mongoose";
import validator from "validator";

const clipSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String],
      max: [10, "No more than 10 tags are allowed"],
    },
    duration: {
      type: Number,
    },
    likes: [{ type: Schema.Types.ObjectId, ref: "Like" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Clip = mongoose.model("Clip", clipSchema);

export default Clip;
