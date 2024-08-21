const errorHandler = require("../../middleware/error.middleware");
const VendorRepository = require("./vendor.repository");

class VendorController {
  constructor() {
    this.vendorRepository = new VendorRepository();
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
}

module.exports = VendorController;
