var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var itemSchema = new Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  price: { type: Number, required: true },
  costPrice: { type: Number, default: 0 },
  size: { type: Number },
  category: { type: Schema.ObjectId, ref: "Category" },
  itemUnit: { type: String },
  unitSize: { type: Number }
});

// Export model.
module.exports = mongoose.model("Item", itemSchema);
