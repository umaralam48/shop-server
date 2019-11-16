var stock = require("../models/stock");
var item = require("../models/item");
const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");

//Get all stocks
exports.getStocks = (req, res) => {
  stock
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

//Get an stock
exports.getStock = (req, res) => {
  let queryString = req.params.name.split(" ").reduce((expString, word) => {
    return (expString += "(?=.*" + word + ")");
  }, "");

  let exp = new RegExp(queryString, "i");
  stock.find({ name: exp }, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("An error occurred");
    }
    res.status(200).json(result);
  });
};

//Add an stock
exports.addStock = [
  // Validate fields.
  body("_id")
    .isLength({ min: 1 })
    .trim()
    .withMessage("stock must be specified.")
    .isAlphanumeric()
    .withMessage("stock has non-alphanumeric characters."),
  body("price")
    .isLength({ min: 1 })
    .trim()
    .withMessage("Price name must be specified.")
    .isInt()
    .withMessage("Price must be a number"),

  sanitizeBody("name").escape(),
  sanitizeBody("price").escape(),

  // Process request after validation and sanitization.

  // Extract the validation errors from a request.

  (req, res) => {
    const errors = validationResult(req);
    console.log(errors);

    if (errors.isEmpty()) {
      var newstock = new stock({
        item: req.body._id,
        price: req.body.price,
        quantity: req.body.quantity
      });

      newstock.save(function(err, stock) {
        if (err) {
          console.log(err);
          res.status(500).json({ error: "An error occurred" });
        }
        stock.populate("item", (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).json({ error: "An error occurred" });
          }
          res.status(201).json({
            success: `Stock created successfully`,
            result: stock.populate("item")
          });
        });
      });
    } else
      return res.status(500).json({ error: "Please enter details correctly!" });
  }
];

//update an stock
exports.updatestock = (req, res) => {
  var newName = req.body.name;
  var newPrice = req.body.price;
  var newsize = req.body.size;
  var newunit = req.body.stockUnit;
  var newunitsize = req.body.unitSize;
  var newCategory = req.body.category;

  stock.findByIdAndUpdate(
    req.params.id,
    {
      name: newName,
      price: newPrice,
      size: newsize,
      stockUnit: newunit,
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

//delete an stock
exports.deletestock = (req, res) => {
  console.log(req.params.id);
  stock.findByIdAndDelete(req.params.id, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "An error ocuurred" });
    }
    res.status(200).json({ success: "stock deleted successfully" });
  });
};
