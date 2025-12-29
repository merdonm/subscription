import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.models.js";

const authorize = async (req, res, next) => {
  try {
    console.log({ header: req.headers.authorization });
    console.log({ user: req.user });
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      const error = new Error("No token provided");
      error.statusCode = 401;
      throw error;
    }
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    console.log({ decoded });

    req.user = user;

    console.log({ final: (req.user = decoded) });
    console.log({ user: req.user });

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized User",
      error: error.message,
    });
  }
};

export default authorize;
