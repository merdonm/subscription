import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    subscriptionName: {
      type: String,
      trim: true,
      required: [true, "Subscription Name is required"],
      minLength: 2,
      maxLength: 100,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be greater than 0"],
    },
    currency: {
      type: String,
      enum: ["RS, EU, QAR, SAR"],
      default: "RS",
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
    },
    category: {
      type: String,
      enum: ["Sports", "tech"],
    },
    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "inActive", "expired"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: (value) => value <= new Date(),
        message: "Start Date Cant be future Date",
      },
    },

    renewalDate: {
      type: Date,
      // required: true
      validate: {
        validator: function (value) {
          return value <= this.startDate;
        },
        message: "Value Must be greater than the Start Date",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

subscriptionSchema.pre.method();
