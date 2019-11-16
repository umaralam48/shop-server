var express = require("express");
var router = express.Router();
var control = require("../controllers/stockController");

// //Get all items
// router.get("/", control.getStocks);

// //Get items by search
// router.get("/:name", control.getStock);

//Add a new item
router.post("/", control.addStock);

// //Update item
// router.post("/update/:id", control.updateStock);

// //Delete an item
// router.delete("/:id", control.deleteStock);

module.exports = router;
