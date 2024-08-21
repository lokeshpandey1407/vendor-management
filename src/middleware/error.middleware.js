const errorHandler = (err, req, res, next) => {
  console.log(err.stack);
  if (err?.code === 11000 && err?.keyPattern?.contactDetails) {
    return res.status(409).json({
      success: false,
      message: "Vendor already registered with given contact details.",
    });
  }
  return res
    .status(500)
    .send({ success: false, message: "Server Error. Please try again later" });
};

module.exports = errorHandler;
