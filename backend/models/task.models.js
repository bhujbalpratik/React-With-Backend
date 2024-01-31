import mongoose from "mongoose"

const taskSchema = mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    isComplete: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "USER",
      required: true,
    },
  },
  { timestamps: true }
)

export const TASK = mongoose.model("TASK", taskSchema)
