import mongoose from "mongoose";

const routeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    path: {
      type: String, // ex: /users, /subscriptions
      required: true,
      unique: true,
    },

    method: {
      type: String,
      enum: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      required: true,
    },

    description: {
      type: String,
    },

    isProtected: {
      type: Boolean,
      default: true,
    },

    rolesAllowed: [
      {
        type: String,
        enum: ["user", "admin", "superadmin"],
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Route", routeSchema);
