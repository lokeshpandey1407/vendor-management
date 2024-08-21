const mongoose = require("mongoose");

const historicalPerformanceSchema = new mongoose.Schema({
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" },
  date: { type: Date },
  onTimeDeliveryRate: { type: Number },
  qualityRatingAvg: { type: Number },
  averageResponseTime: { type: Number },
  fulfillmentRate: { type: Number },
});

const HistoricalPerformance = mongoose.model(
  "HistoricalPerformance",
  historicalPerformanceSchema
);

module.exports = HistoricalPerformance;
