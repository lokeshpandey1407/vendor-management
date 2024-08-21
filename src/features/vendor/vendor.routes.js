const { Router } = require("express");
const VendorController = require("./vendor.controller");

const vendorRoutes = Router();
const vendorController = new VendorController();

vendorRoutes.post("/vendors", (req, res, next) => {
  vendorController.createVendor(req, res, next);
});

vendorRoutes.get("/vendors/:vendorId", (req, res, next) => {
  vendorController.getVendor(req, res, next);
});

vendorRoutes.get("/vendors", (req, res, next) => {
  vendorController.getAllVendors(req, res, next);
});

vendorRoutes.delete("/vendors/:vendorId", (req, res, next) => {
  vendorController.deleteVendor(req, res, next);
});

vendorRoutes.put("/vendors/:vendorId", (req, res, next) => {
  vendorController.updateVendor(req, res, next);
});

module.exports = vendorRoutes;
