const Admin = require("./admin.schema");

class AdminRepository {
  async signup(data) {
    const user = await Admin(data).save();
    return user;
  }

  async findByEmail(email) {
    const user = await Admin.findOne({ email });
    return user;
  }

  async findById(id) {
    const user = await Admin.findById(id).select("-password");
    return user;
  }
}

module.exports = AdminRepository;
