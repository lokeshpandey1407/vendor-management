const errorHandler = require("../../middleware/error.middleware");
const HistoricalPerformanceRepository = require("../historicalPerformance/historicalPerformance.repository");
const VendorRepository = require("./vendor.repository");

class VendorController {
  constructor() {
    this.vendorRepository = new VendorRepository();
    this.historicalPerformanceRepository =
      new HistoricalPerformanceRepository();
  }

  async createVendor(req, res, next) {
    try {
      const data = req.body;
      const vendor = await this.vendorRepository.createVendor(data);
      if (!vendor) {
        return res.status(400).send({
          succcess: false,
          message: "Unable to create Vendor. Please try again",
        });
      }
      return res.status(201).send({
        success: true,
        data: vendor,
        message: "Vendor created successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async getVendor(req, res, next) {
    try {
      const vendorId = req.params.vendorId;
      if (!vendorId) {
        return res.status(404).send({
          succcess: false,
          message: "Invalid Id. Please check the id and try again",
        });
      }
      const vendor = await this.vendorRepository.getVendorData(vendorId);
      if (!vendor) {
        return res.status(404).send({
          succcess: false,
          message: "Not found! Unable to found vendor details with given id.",
        });
      }
      return res.status(201).send({
        success: true,
        data: vendor,
        message: "Vendor created successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllVendors(req, res, next) {
    try {
      const vendors = await this.vendorRepository.getAllVendors();
      return res.status(200).send({
        success: true,
        data: vendors,
        message: "Vendors found successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async updateVendor(req, res, next) {
    try {
      const data = req.body;
      const vendorId = req.params.vendorId;
      if (!vendorId) {
        return res.status(404).send({
          succcess: false,
          message: "Invalid Id. Please check the id and try again",
        });
      }
      const vendor = await this.vendorRepository.updateVendor(vendorId, data);
      if (!vendor) {
        return res.status(404).send({
          succcess: false,
          message: "Not found! Unable to found vendor details with given id.",
        });
      }
      return res.status(201).send({
        success: true,
        data: vendor,
        message: "Vendor updated successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteVendor(req, res, next) {
    try {
      const vendorId = req.params.vendorId;
      if (!vendorId) {
        return res.status(404).send({
          succcess: false,
          message: "Invalid Id. Please check the id and try again",
        });
      }
      const vendor = await this.vendorRepository.getVendorData(vendorId);
      if (!vendor) {
        return res.status(404).send({
          succcess: false,
          message: "Invalid Id. Vendor not found with the given id.",
        });
      }
      await this.vendorRepository.deleteVendor(vendorId);
      return res
        .status(200)
        .send({ success: true, message: "Vendor deleted successfully" });
    } catch (error) {
      next(error);
    }
  }

  async getVenderPerformance(req, res, next) {
    try {
      const vendorId = req.params.vendorId;
      const vendor = await this.vendorRepository.getVendorData(vendorId);
      if (!vendor) {
        return res.status(404).send({
          success: false,
          message: "Invalid vendorId. Please check the id and try again",
        });
      }
      const performanceObj = {
        vendor: vendorId,
        date: new Date(),
        onTimeDeliveryRate: vendor.onTimeDeliveryRate || null,
        qualityRatingAvg: vendor.qualityRatingAvg || null,
        averageResponseTime: vendor.averageResponseTime || null,
        fulfillmentRate: vendor.fulfillmentRate || null,
      };
      const vendorPerformance = await this.historicalPerformanceRepository.create(
        performanceObj
      );
      if (!vendorPerformance) {
        return res.status(400).send({
          success: false,
          message: "Some error occured. Please try again",
        });
      }
      return res.status(200).send({
        success: true,
        data: vendorPerformance,
        message: "Vendor performance fetched successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = VendorController;
