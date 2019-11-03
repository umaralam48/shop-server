var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var stockSchema = new Schema({
  name: { type: Schema.ObjectId, ref: Item, required },
  createdAt: { type: Date, default: Date.now },
  quantity: { type: Number, default: 0, required },
  price: { type: Number, required }
});

module.exports = mongoose.model("Stock", stockSchema);
