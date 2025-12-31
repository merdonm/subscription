import Subscription from "../models/subscription.models.js";

export const CreateSubscription = async (req, res, next) => {
  try {
    const result = await Subscription.create({
      ...req.body,
      user: req.user.id,
    });
    res.status(201).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const GetAllSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find({
      user: req.user.id,
      //   status: "active",
    });
    res.json({
      status: "success",
      data: subscriptions,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const GetSubscriptionById = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) {
      const error = new Error("Subscription not found");
      error.status = 404;
      throw error;
    }
    res.status(200).json({
      data: subscription,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const GetSubscriptionsByUserId = async (req, res, next) => {
  try {
    const userId = req.params.id;

    // Authorization check
    if (userId !== req.user.id.toString()) {
      const error = new Error("Unauthorized access");
      error.statusCode = 403;
      throw error;
    }

    const subscriptions = await Subscription.find({ user: userId });

    const formattedSubscriptions = subscriptions.map((sub) => ({
      ...sub.toObject(),
      role: "user",
    }));

    res.status(200).json({
      success: true,
      count: formattedSubscriptions.length,
      data: formattedSubscriptions,
    });
  } catch (error) {
    next(error);
  }
};

export const UpdateSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!subscription) {
      const error = new Error("Subscription not found");
      error.status = 404;
      throw error;
    }
    res.status(200).json({
      status: "success",
      data: subscription,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const DeleteSubscription = async (req, res, next) => {
  try {
  } catch (error) {}
};
