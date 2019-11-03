var express = require("express");
var router = express.Router();
var control = require("../controllers/itemController");

//Get all items
router.get("/", control.getItems);

//Get items by search
router.get("/:name", control.getItem);

//Add a new item
router.post("/", control.addItem);

//Update item
router.post("/update/:id", control.updateItem);

//Delete an item
router.delete("/:id", control.deleteItem);

module.exports = router;
