import { Schema, model, models } from "mongoose";

const quoteSchema = new Schema({
  quote: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
});

export default models.Quote || model("Quote", quoteSchema);
