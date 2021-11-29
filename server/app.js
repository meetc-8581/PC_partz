var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

var userRouter = require("./routes/usersRouter");
var productsRouter = require("./routes/productsRouter");
var imagesRouter = require("./routes/imagesRouter");
var loginRouter = require("./routes/loginRouter");
var cartRouter = require("./routes/cartRouter");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


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

app.use("/user", userRouter);
app.use("/products", productsRouter);
app.use("/images", imagesRouter);
app.use("/login", loginRouter);
app.use("/cart", cartRouter);

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
});

module.exports = app;
