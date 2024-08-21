const jwt = require("jsonwebtoken");

const Auth = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Missing or invalid token",
      });
    }
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "unauthorized Access! login to continue!",
      });
    } else {
      const payload = jwt.verify(authToken, process.env.SECRET_KEY);
      req.userId = payload.userId;
      req.name = payload.name;
    }
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      message: "Unauthorized! Missing or invalid token",
    });
  }
  next();
};


module.exports = Auth;
