import { Router } from "express";

const userRouter = Router();

// GET all users
userRouter.get("/", (req, res) => {
  res.json({ message: "GET all users" });
});

// GET user by ID
userRouter.get("/:id", (req, res) => {
  res.json({ message: `GET user with ID ${req.params.id}` });
});

// CREATE user
userRouter.post("/", (req, res) => {
  res.status(201).json({ message: "CREATE new user", data: req.body });
});

// UPDATE user (full update)
userRouter.put("/:id", (req, res) => {
  res.json({
    message: `UPDATE user ${req.params.id}`,
    data: req.body,
  });
});

// UPDATE user (partial update)
userRouter.patch("/:id", (req, res) => {
  res.json({
    message: `PATCH user ${req.params.id}`,
    data: req.body,
  });
});

// DELETE user
userRouter.delete("/:id", (req, res) => {
  res.json({ message: `DELETE user ${req.params.id}` });
});

export default userRouter;
