import { Router } from "express";

const authRouter = Router();

// Register new user
authRouter.post("/register", (req, res) => {
  res.status(201).json({ message: "User registered" });
});

// Login user
authRouter.post("/login", (req, res) => {
  res.json({ message: "User logged in" });
});

// Logout user
authRouter.post("/logout", (req, res) => {
  res.json({ message: "User logged out" });
});

// Refresh token
authRouter.post("/refresh", (req, res) => {
  res.json({ message: "Token refreshed" });
});

export default authRouter;
