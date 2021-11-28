var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

var indexRouter = require("./routes/index");
var loginRouter = require("./routes/login");
var productsRouter = require("./routes/products");
var imagesRouter = require("./routes/images");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// user = config.get("dbuser");
// pass = config.get("dbpass");
// url = `mongodb+srv://meet:meet_6040@cluster0.3d2ex.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

app.use(
  cors({
    origin: ["http://localhost:3001"],
    credentials: true,
  })
);

mongoose
  .connect("mongodb://localhost/PCpartz", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB PCpartz");
  })
  .catch((err) => {
    console.error("Could not connect to MongoDB");
    console.log(err);
  });

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/products", productsRouter);
app.use("/images", imagesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
