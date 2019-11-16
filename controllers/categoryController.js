var category = require("../models/category");

exports.addCategory = (req, res) => {
  if (req.body.name && req.body.name.trim() !== "") {
    category.create({ name: req.body.name }, (err, result) => {
      if (err) {
        console.log(err);
        console.log(err.message);
        return res.status(500).json({
          error: err.message
        });
      }

      return res.status(201).json({
        success: `${result.name} created successfully`,
        result: result
      });
    });
  } else return res.status(403).json({ error: "Name should not be empty" });
};

exports.getCategories = (req, res) => {
  category
    .find({})
    .sort({ name: 1 })
    .exec((err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "An error occurred!" });
      }
      res.status(200).json(result);
    });
};
