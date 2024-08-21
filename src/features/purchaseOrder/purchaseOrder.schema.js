const mongoose = require("mongoose");
const crypto = require("crypto");

const purchaseOrderSchema = new mongoose.Schema({
  poNumber: { type: String },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" },
  orderDate: { type: Date },
  deliveryDate: { type: Date },
  items: { type: JSON },
  quantity: { type: Number },
  status: {
    type: String,
    enum: {
      values: ["pending", "completed", "canceled"],
      message: "Invalid Status. Please enter a valid status and try again",
    },
    required: true,
    default: "pending",
  },
  qualityRating: { type: Number },
  issueDate: { type: Date },
  acknowledgmentDate: { type: Date },
});

purchaseOrderSchema.pre("save", async function (next) {
  this.poNumber = crypto.randomBytes(6).toString("hex");
  next();
});

const PurchaseOrder = mongoose.model("PurchaseOrder", purchaseOrderSchema);

module.exports = PurchaseOrder;
