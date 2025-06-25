import mongoose from "mongoose";

const { Schema, model } = mongoose;

const cartCollection = "cart";

const cartSchema = new Schema({
  tasks: {
    type: [
      {
        task: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
    default: [],
  },
});

cartSchema.pre("find", function (next) {
  this.populate("tasks.task");
  next();
});

const cartModel = model(cartCollection, cartSchema);

export default cartModel;
