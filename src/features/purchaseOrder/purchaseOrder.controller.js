const { default: mongoose } = require("mongoose");
const VendorRepository = require("../vendor/vendor.repository");
const PurchaseOrderRepository = require("./purchaseOrder.repository");
const PurchaseOrder = require("./purchaseOrder.schema");

class PurchaseOrderController {
  constructor() {
    this.purchaseOrderRepository = new PurchaseOrderRepository();
    this.vendorRepository = new VendorRepository();
  }
  async createPurchaseOrder(req, res, next) {
    try {
      const data = req.body;
      //po = purchaseOrder
      const po = await this.purchaseOrderRepository.createPurchaseOrder(data);
      if (!po) {
        return res.status(400).send({
          succcess: false,
          message: "Unable to create purchase Order. Please try again",
        });
      }
      return res.status(201).send({
        success: true,
        data: po,
        message: "Purchage Order created successful",
      });
    } catch (error) {
      next(error);
    }
  }

  async getPurchaseOrders(req, res, next) {
    try {
      const { filter } = req.query;
      //pos = purchaseOrders
      let vendorId;
      if (filter) {
        vendorId = filter;
      } else {
        vendorId = null;
      }
      const pos = await this.purchaseOrderRepository.getPurchaseOrders(
        vendorId
      );
      if (!pos) {
        return res.status(400).send({
          succcess: false,
          message: "Unable to find purchase Orders. Please try again",
        });
      }
      return res.status(200).send({
        success: true,
        data: pos,
        message: "Purchage Orders found successful",
      });
    } catch (error) {
      next(error);
    }
  }

  async getPurchaseOrder(req, res, next) {
    try {
      const poid = req.params.poid;
      if (!poid) {
        return res.status(404).send({
          succcess: false,
          message:
            "Invalid purchase order id. Please check the id and try again.",
        });
      }
      //po = purchaseOrder
      const po = await this.purchaseOrderRepository.getPurchaseOrder(poid);
      if (!po) {
        return res.status(400).send({
          succcess: false,
          message: "Unable to find purchase Order. Please try again",
        });
      }
      return res.status(200).send({
        success: true,
        data: po,
        message: "Purchage Order found successful",
      });
    } catch (error) {
      next(error);
    }
  }

  async updatePurchaseOrder(req, res, next) {
    try {
      const poid = req.params.poid;
      const data = req.body;
      if (!poid) {
        return res.status(404).send({
          succcess: false,
          message:
            "Invalid purchase order id. Please check the id and try again.",
        });
      }
      const prevPo = await this.purchaseOrderRepository.getPurchaseOrder(poid);
      const po = await this.purchaseOrderRepository.updatePurchaseOrder(
        poid,
        data
      );
      if (!po) {
        return res.status(400).send({
          succcess: false,
          message: "Purchase Order can't be updated. Please try again.",
        });
      }

      //On time dilevery rate calculation
      if (prevPo.status !== "completed" && po.status === "completed") {
        const vendorId = prevPo.vendor;
        const currentDate = new Date();
        const completedOrderOnTime = await PurchaseOrder.countDocuments({
          vendor: vendorId,
          status: "completed",
          deliveryDate: { $gte: currentDate },
        });
        const totalPoForCurrentVendor = (
          await this.purchaseOrderRepository.getPurchaseOrders(vendorId)
        ).length;
        const onTimeDeliveryRate =
          completedOrderOnTime / totalPoForCurrentVendor;
        const vendor = await this.vendorRepository.getVendorData(vendorId);
        vendor.onTimeDeliveryRate = onTimeDeliveryRate;
        await vendor.save();
      }

      //Vendor average rating calculation
      if (prevPo.qualityRating !== po.qualityRating) {
        const vendorId = prevPo.vendor;
        const result = await PurchaseOrder.aggregate([
          {
            $match: {
              vendor: new mongoose.Types.ObjectId(vendorId),
              status: "completed",
            },
          },
          { $group: { _id: null, averageRating: { $avg: "$qualityRating" } } },
        ]);
        const averageRating =
          result.length > 0 ? result[0].averageRating : null;
        const vendor = await this.vendorRepository.getVendorData(vendorId);
        vendor.qualityRatingAvg = averageRating;
        await vendor.save();
      }

      

      return res.status(200).send({
        success: true,
        data: po,
        message: "Purchase order updated successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async deletePurchaseOrder(req, res, next) {
    try {
      const poid = req.params.poid;
      if (!poid) {
        return res.status(404).send({
          succcess: false,
          message:
            "Invalid purchase order id. Please check the id and try again.",
        });
      }
      const purchaseOrder = await this.purchaseOrderRepository.getPurchaseOrder(
        poid
      );
      if (!purchaseOrder) {
        return res.status(404).send({
          succcess: false,
          message: "Invalid Id. Purchase Order not found with the given id.",
        });
      }
      //po = purchaseOrder
      const po = await this.purchaseOrderRepository.deletePurchaseOrder(poid);
      if (!po) {
        return res.status(400).send({
          succcess: false,
          message: "Unable to delete purchase Order. Please try again",
        });
      }
      return res.status(200).send({
        success: true,
        message: "Purchage Order deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = PurchaseOrderController;
