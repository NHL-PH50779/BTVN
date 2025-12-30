import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema({
 
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  

  priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },

  { timestamps: true, versionKey: false }
);
const Todo = mongoose.model("Todos", todoSchema);

export default Todo;
