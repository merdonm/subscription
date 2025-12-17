import express from "express";
import { PORT } from "./config/env.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectToDatabase from "./database/mongodb.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello Express ");
});

app.use("/users", userRouter);
app.use("/subscription", subscriptionRouter);
app.use("/auth", authRouter);

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await connectToDatabase();
});
