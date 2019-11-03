var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

// Export model.
module.exports = mongoose.model("Category", categorySchema);
