const Vendor = require("./vendor.schema");

class VendorRepository {
  async createVendor(data) {
    const vendor = await Vendor.create(data);
    return vendor;
  }

  async getVendorData(id) {
    const vendor = await Vendor.findById(id);
    return vendor;
  }

  async getAllVendors() {
    const vendors = await Vendor.find({});
    return vendors;
  }

  async deleteVendor(id) {
    const vendor = await Vendor.deleteOne({ _id: id });
    return vendor;
  }

  async updateVendor(id, data) {
    const vendor = await Vendor.findOneAndUpdate(
      { _id: id },
      { ...data },
      { new: true }
    );
    return vendor;
  }
}

module.exports = VendorRepository;
