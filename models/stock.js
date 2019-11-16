var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var item = require("./item");
var stockSchema = new Schema({
  item: { type: Schema.ObjectId, ref: "Item", required: true },
  createdAt: { type: Date, default: Date.now },
  quantity: { type: Number, default: 0, required: true },
  price: { type: Number, required: true }
});
stockSchema.pre("save", function(next) {
  item.findByIdAndUpdate(
    this.item,
    {
      $set: { costPrice: Math.round(this.price / this.quantity) },
      $currentDate: {
        createdAt: true
      }
    },
    { new: true },
    (err, result) => {
      if (err) {
        console.log(err);
        next(err);
      } else {
        console.log("updated item", result);
      }
    }
  );
  next();
});
module.exports = mongoose.model("Stock", stockSchema);
