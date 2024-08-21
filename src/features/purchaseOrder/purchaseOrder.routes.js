const { Router } = require("express");
const PurchaseOrderController = require("./purchaseOrder.controller");

const purchaseOrderRoutes = Router();
const purchaseOrderController = new PurchaseOrderController();

purchaseOrderRoutes.post("/purchase-orders", (req, res, next) => {
  purchaseOrderController.createPurchaseOrder(req, res, next);
});

purchaseOrderRoutes.get("/purchase-orders/:poid", (req, res, next) => {
  purchaseOrderController.getPurchaseOrder(req, res, next);
});

purchaseOrderRoutes.get("/purchase-orders", (req, res, next) => {
  purchaseOrderController.getPurchaseOrders(req, res, next);
});

purchaseOrderRoutes.delete("/purchase-orders/:poid", (req, res, next) => {
  purchaseOrderController.deletePurchaseOrder(req, res, next);
});

purchaseOrderRoutes.put("/purchase-orders/:poid", (req, res, next) => {
  purchaseOrderController.updatePurchaseOrder(req, res, next);
});

module.exports = purchaseOrderRoutes;
