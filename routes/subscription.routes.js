import { Router } from "express";

const subscriptionRouter = Router();

// Create subscription
subscriptionRouter.post("/", (req, res) => {
  res.status(201).json({ message: "Subscription created" });
});

// Get all subscriptions (admin / user)
subscriptionRouter.get("/", (req, res) => {
  res.json({ message: "Get all subscriptions" });
});

// Get subscription by ID
subscriptionRouter.get("/:id", (req, res) => {
  res.json({ message: `Get subscription ${req.params.id}` });
});

// Update subscription
subscriptionRouter.put("/:id", (req, res) => {
  res.json({ message: `Update subscription ${req.params.id}` });
});

// Cancel subscription
subscriptionRouter.delete("/:id", (req, res) => {
  res.json({ message: `Cancel subscription ${req.params.id}` });
});

// Pause subscription
subscriptionRouter.patch("/:id/pause", (req, res) => {
  res.json({ message: `Subscription ${req.params.id} paused` });
});

// Resume subscription
subscriptionRouter.patch("/:id/resume", (req, res) => {
  res.json({ message: `Subscription ${req.params.id} resumed` });
});

export default subscriptionRouter;
