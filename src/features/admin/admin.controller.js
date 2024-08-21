const AdminRepository = require("./admin.repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AdminController {
  constructor() {
    this.adminRepository = new AdminRepository();
  }
  async signup(req, res, next) {
    try {
      const admin = await this.adminRepository.signup(req.body);
      return res.status(201).send({
        success: true,
        data: admin,
        message: "Admin created successfully.",
      });
    } catch (error) {
      next(error);
    }
  }

  async signin(req, res, next) {
    try {
      const { email, password } = req.body;
      const admin = await this.adminRepository.findByEmail(email);
      if (!admin) {
        return res.status(404).send({
          success: false,
          message:
            "Unregistered/Invalid Email. Please check the email and try again.",
        });
      }
      const isValid = await bcrypt.compare(password, admin.password);

      if (!isValid) {
        return res.status(500).send({
          success: false,
          message:
            "Invalid Credentials. Please check the credentials and try again",
        });
      }
      const token = jwt.sign(
        { name: admin.name, adminId: admin._id },
        process.env.SECRET_KEY,
        { expiresIn: "7d" }
      );
      return res.status(200).send({
        success: true,
        data: admin,
        token: token,
        message: "Singn in successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AdminController;
