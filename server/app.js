require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

var signinRouter = require("./routes/signinRouter");
var productsRouter = require("./routes/productsRouter");
var imagesRouter = require("./routes/imagesRouter");
var loginRouter = require("./routes/loginRouter");
var cartRouter = require("./routes/cartRouter");
var adminRouter = require("./routes/adminRouter");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "/public")));

app.use(
  cors({
    origin: ["http://localhost:3001"],
    credentials: true,
  })
);

mongoose
  // .connect("mongodb://localhost/PCpartz", {
  .connect(
    "mongodb+srv://meet:S3x7SkNTHKpOcBVr@cluster0.3d2ex.mongodb.net/Pcpartz?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB PCpartz");
  })
  .catch((err) => {
    console.error("Could not connect to MongoDB");
    console.log(err);
  });

app.use(express.static(path.join(__dirname, "./public/build")));

app.get("/", (req, res) => {
  res.sendFile("./public/build/index.html", (err) => {
    res.status(500).send(err);
  });
});

app.use("/api/signin", signinRouter);
app.use("/api/products", productsRouter);
app.use("/api/images", imagesRouter);
app.use("/api/login", loginRouter);
app.use("/api/cart", cartRouter);
app.use("/api/admin", adminRouter);

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

app.listen(process.env.PORT, function () {
  console.log("Listenong on port 3000");
});

module.exports = app;
