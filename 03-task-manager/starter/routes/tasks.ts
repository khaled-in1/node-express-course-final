import express from "express";
const router = express.Router();
const { getAllTasks, getTask, createTask, updateTask, deleteTask } =
  require("../controllers/tasks").default;

router.get("/", getAllTasks).post("/", createTask);
router
  .get("/:id", getTask)
  .patch("/:id", updateTask)
  .delete("/:id", deleteTask);

export { router };
