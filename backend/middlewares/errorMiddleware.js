const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  let message = err.message;
  if (res.customErr) {
    message = err.message;
  } else {
    console.log(err);
    message = "Something went wrong";
  }

  res.json({
    message: message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
  next();
};

module.exports = errorHandler;
