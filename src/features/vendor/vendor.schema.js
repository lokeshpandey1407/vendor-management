const mongoose = require("mongoose");
const crypto = require("crypto");

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactDetails: { type: String, required: true, unique: true },
  address: { type: String },
  vendorCode: { type: String },
  onTimeDeliveryRate: { type: Number },
  qualityRatingAvg: { type: Number },
  averageResponseTime: { type: Number },
  fulfillmentRate: { type: Number },
});

vendorSchema.pre("save", async function (next) {
  this.vendorCode = crypto.randomBytes(6).toString("hex");
  next();
});

const Vendor = mongoose.model("Vendor", vendorSchema);
module.exports = Vendor;
