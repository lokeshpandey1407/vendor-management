const express = require("express");
const cors = require("cors");
const errorHandler = require("./src/middleware/error.middleware");
const { connectToMongoose } = require("./src/config/mongoDB.config");
const vendorRoutes = require("./src/features/vendor/vendor.routes");
const swagger = require("swagger-ui-express");
const swaggerJson = require("./swagger.json");
const purchaseOrderRoutes = require("./src/features/purchaseOrder/purchaseOrder.routes");
const Auth = require("./src/middleware/auth.middleware");
const adminRoutes = require("./src/features/admin/admin.routes");

const app = express();
require('dotenv').config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-doc", swagger.serve, swagger.setup(swaggerJson));

app.get("/", (req, res, next) => {
  res.status(200).send({ success: true, message: "Welcome to the server" });
});

app.use("/auth", adminRoutes);
app.use("/", Auth, vendorRoutes);
app.use("/", Auth, purchaseOrderRoutes);

app.use(errorHandler);

app.listen(process.env.PORT || 3001, () => {
  console.log(`Application is listening on port ${process.env.PORT}`);
  connectToMongoose();
});
