const { Router } = require("express");
const AdminController = require("./admin.controller");

const adminRoutes = Router();
const adminController = new AdminController();

adminRoutes.post("/signup", (req, res, next) => {
  adminController.signup(req, res, next);
});

adminRoutes.post("/signin", (req, res, next) => {
  adminController.signin(req, res, next);
});

module.exports = adminRoutes;
