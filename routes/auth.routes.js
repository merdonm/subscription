import { Router } from "express";
import { SignIn, SignUp } from "../controllers/auth.controller.js";

const authRouter = Router();

// Register new user
authRouter.post("/sign-up", SignUp);

// Login user
authRouter.post("/sign-in", SignIn);

// Logout user
authRouter.post("/logout", (req, res) => {
  res.json({ message: "User logged out" });
});

// Refresh token
authRouter.post("/refresh", (req, res) => {
  res.json({ message: "Token refreshed" });
});

export default authRouter;
