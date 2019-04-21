const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const usersRouter = require("./routes/users");
const { createEngine } = require("./viewEngine");

const app = express();

global.fetch = require("isomorphic-fetch");

// view engine setup
app.set("views", [
  path.resolve(__dirname, "./views"),
  path.resolve(__dirname, "../common")
]);
app.set("view engine", "js");
app.engine("js", createEngine());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if (process.env.NODE_ENV !== "production") {
  const webpack = require("webpack");
  const middleware = require("webpack-dev-middleware");
  const compiler = webpack(require("../../config/webpack.dev"));
  app.use(
    middleware(compiler, {
      publicPath: "/dist"
    })
  );
}

app.use(express.static(path.join(__dirname, "../../public")));
app.use("/", usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
