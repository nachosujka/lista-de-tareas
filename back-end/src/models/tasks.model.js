import mongoose from "mongoose";

const { Schema, model } = mongoose;

const taskCollection = "task";

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const taskModel = model(taskCollection, taskSchema);

export default taskModel;
