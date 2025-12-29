import bcrypt from "bcryptjs";
import User from "../models/user.models.js";
import mongoose from "mongoose";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
import jwt from "jsonwebtoken";

export const SignUp = async (req, res, next) => {
  const session = await mongoose.startSession();

  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      const error = new Error("All fields are required");
      error.statusCode = 400;
      throw error;
    }

    session.startTransaction();

    const existingUser = await User.findOne({ email }).session(session);
    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const [newUser] = await User.create(
      [{ userName, email, password: hashedPassword }],
      { session }
    );

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        token,
        user: newUser,
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const SignIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("Email and password are required");
      error.statusCode = 400;
      throw error;
    }

    // Explicitly include password
    const existingUser = await User.findOne({ email }).select("+password");

    if (!existingUser) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }

    // ✅ Correct bcrypt comparison
    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ id: existingUser._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    // Remove password before sending
    existingUser.password = undefined;

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: existingUser,
      },
    });
  } catch (error) {
    next(error);
  }
};
