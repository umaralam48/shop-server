var app = require("express");
var router = app.Router();
var control = require("../controllers/categoryController");

router.get("/", control.getCategories);

//router.get("/:name", control.getCategory);

router.post("/", control.addCategory);

//router.delete("/", control.deleteCategory);

module.exports = router;
