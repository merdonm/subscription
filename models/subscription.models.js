import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    subscriptionName: {
      type: String,
      trim: true,
      required: true,
      minlength: 2,
      maxlength: 100,
    },

    price: {
      type: Number,
      required: true,
      min: [1, "Price must be greater than 0"],
    },

    currency: {
      type: String,
      enum: ["RS", "EU", "QAR", "SAR"],
      default: "RS",
    },

    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
      required: true,
    },

    category: {
      type: String,
      enum: ["sports", "tech"],
      lowercase: true,
    },

    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive", "expired"],
      default: "active",
    },

    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: (value) => value <= new Date(),
        message: "Start date cannot be in the future",
      },
    },

    renewalDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return value >= this.startDate;
        },
        message: "Renewal date must be after start date",
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

subscriptionSchema.pre("save", async function () {
  if (!this.renewalDate) {
    this.renewalDate = new Date(this.startDate);

    if (this.frequency === "daily")
      this.renewalDate.setDate(this.renewalDate.getDate() + 1);
    if (this.frequency === "weekly")
      this.renewalDate.setDate(this.renewalDate.getDate() + 7);
    if (this.frequency === "monthly")
      this.renewalDate.setMonth(this.renewalDate.getMonth() + 1);
    if (this.frequency === "yearly")
      this.renewalDate.setFullYear(this.renewalDate.getFullYear() + 1);
  }

  if (this.renewalDate && this.renewalDate < new Date()) {
    this.status = "expired";
  }
});

export default mongoose.model("Subscription", subscriptionSchema);
