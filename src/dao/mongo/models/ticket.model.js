import { Schema, model } from "mongoose";

const collection = "tickets";

const schema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    purchase_datetime: {
      type: Date,
      default: Date.now,
    },
    amount: {
      type: Number,
      required: true,
    },
    purchaser: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Ticket = model(collection, schema);
export default Ticket;
