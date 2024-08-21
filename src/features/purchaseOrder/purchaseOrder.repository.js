const PurchaseOrderController = require("./purchaseOrder.controller");
const PurchaseOrder = require("./purchaseOrder.schema");

class PurchaseOrderRepository {
  async createPurchaseOrder(data) {
    const po = await PurchaseOrder.create(data);
    return po;
  }

  async getPurchaseOrders(vendorId) {
    if (vendorId) {
      const po = await PurchaseOrder.find({ vendor: vendorId });
      return po;
    } else {
      const po = await PurchaseOrder.find({});
      return po;
    }
  }

  async getPurchaseOrder(poid) {
    const po = await PurchaseOrder.findOne({ _id: poid });
    return po;
  }

  async updatePurchaseOrder(poid, data) {
    const po = await PurchaseOrder.findOneAndUpdate(
      { _id: poid },
      { ...data },
      { new: true }
    );
    return po;
  }

  async deletePurchaseOrder(poid) {
    const po = await PurchaseOrder.deleteOne({ _id: poid });
    return po;
  }
}

module.exports = PurchaseOrderRepository;
