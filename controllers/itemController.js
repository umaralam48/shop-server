var item = require("../models/item");
const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");

//Get all items
exports.getItems = (req, res) => {
  item
    .find({})
    .sort({ name: 1 })
    .populate("category")
    .exec((err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "An error occurred!" });
      }
      res.status(200).json(result);
    });
};

//Get an item
exports.getItem = (req, res) => {
  let queryString = req.params.name.split(" ").reduce((expString, word) => {
    return (expString += "(?=.*" + word + ")");
  }, "");

  let exp = new RegExp(queryString, "i");
  item
    .find({ name: exp })
    .populate("category")
    .exec((err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("An error occurred");
      }
      res.status(200).json(result);
    });
};

//Add an item
exports.addItem = [
  // Validate fields.
  body("name")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Name must be specified."),
  body("price")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Price name must be specified.")
    .isInt()
    .withMessage("Price must be a number"),

  sanitizeBody("name").escape(),
  sanitizeBody("itemUnit").escape(),

  // Process request after validation and sanitization.

  // Extract the validation errors from a request.

  (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (errors.isEmpty()) {
      var newItem = new item({
        name: req.body.name,
        price: req.body.price,
        size: req.body.size,
        itemUnit: req.body.itemUnit,
        unitSize: req.body.unitSize,
        category: req.body.category
      });
      newItem.save(function(err, item) {
        if (err) {
          console.log(err);
          res.status(500).json({ error: "An error occurred" });
        }
        console.log(item);
        res.status(201).json({ success: `${item.name} created successfully` });
      });
    } else
      return res.status(500).json({ error: "Please enter details correctly!" });
  }
];

//update an item
exports.updateItem = (req, res) => {
  var newName = req.body.name;
  var newPrice = req.body.price;
  var newsize = req.body.size;
  var newunit = req.body.itemUnit;
  var newunitsize = req.body.unitSize;
  var newCategory = req.body.category;

  item.findByIdAndUpdate(
    req.params.id,
    {
      name: newName,
      price: newPrice,
      size: newsize,
      itemUnit: newunit,
      unitSize: newunitsize,
      category: newCategory
    },
    { omitUndefined: true, new: true },
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json("An error occurred");
      }
      res
        .status(200)
        .json({ result, success: `${result.name} updated successfully` });
    }
  );
};

//delete an item
exports.deleteItem = (req, res) => {
  console.log(req.params.id);
  item.findByIdAndDelete(req.params.id, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "An error ocuurred" });
    }
    res.status(200).json({ success: "Item deleted successfully" });
  });
};
