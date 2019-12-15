var express = require("express");
var path = require("path");
var cors = require("cors");
var itemRouter = require("./routes/item");
var categoryRouter = require("./routes/category");
var stockRouter = require("./routes/stock");
var app = express();

// Set up mongoose connection
var mongoose = require("mongoose");
var dev_db_url = "mongodb://127.0.0.1/shop";
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

//middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/greet", (req, res) => {
  res.send("<h1>HI UMar</h1>");
});

app.use("/item", itemRouter);
app.use("/category", categoryRouter);
app.use("/stock", stockRouter);

app.listen(process.env.PORT || 4000, () => {
  console.log("Shop server listening on 4000");
});
