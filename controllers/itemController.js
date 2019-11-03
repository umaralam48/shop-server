var item = require("../models/item");

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
  item.find({ name: exp }, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("An error occurred");
    }
    res.status(200).json(result);
  });
};

//Add an item
exports.addItem = (req, res) => {
  var newItem = new item({
    name: req.body.name,
    price: req.body.price,
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
};

//update an item
exports.updateItem = (req, res) => {
  var newName = req.body.name;
  var newPrice = req.body.price;
  var newunit = req.body.itemUnit;
  var newunitsize = req.body.unitSize;
  var newCategory = req.body.category;

  item.findByIdAndUpdate(
    req.params.id,
    {
      name: newName,
      price: newPrice,
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
  item.findByIdAndDelete(req.params.id, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "An error ocuurred" });
    }
    res.status(200).json({ success: "Item deleted successfully" });
  });
};
