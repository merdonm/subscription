import { Router } from "express";
import {
  CreateSubscription,
  GetAllSubscriptions,
  GetSubscriptionById,
  GetSubscriptionsByUserId,
  UpdateSubscription,
} from "../controllers/subscription.controller.js";
import authorize from "../middleware/auth.middleware.js";

const subscriptionRouter = Router();

// Create subscription
subscriptionRouter.post("/", authorize, CreateSubscription);

// Get all subscriptions (admin / user)
subscriptionRouter.get("/", authorize, GetAllSubscriptions);

// Get subscription by ID
subscriptionRouter.get("/:id", authorize, GetSubscriptionById);

// Update subscription
subscriptionRouter.put("/:id", authorize, UpdateSubscription);

subscriptionRouter.get("/user/:id", authorize, GetSubscriptionsByUserId);

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
subscriptionRouter.patch("/:id/cancel", (req, res) => {
  res.json({ message: `Subscription ${req.params.id} canceled` });
});

export default subscriptionRouter;
