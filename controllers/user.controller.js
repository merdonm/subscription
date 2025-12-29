import mongoose from "mongoose";
import User from "../models/user.models.js";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

// Base URL: /api/v1/users
export const GetAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      message: "All User data",
      users: users,
    });
  } catch (error) {
    next(error);
  }
};

export const GetUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error("Invalid user ID format");
      error.statusCode = 400;
      throw error;
    }

    const user = await User.findById(id);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.status(200).json({
      success: true,
      data: { token, user },
    });
  } catch (error) {
    next(error);
  }
};
