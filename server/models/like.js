import mongoose, { Schema } from "mongoose";
import validator from "validator";

const likeSchema = mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  clipId: { type: Schema.Types.ObjectId, ref: "Clip" },
});

const Like = mongoose.model("Like", likeSchema);

export default Like;
