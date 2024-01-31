import express from "express"
import {
  deleteTask,
  newTask,
  showTask,
  updateTask,
} from "../controllers/task.controllers.js"
import { isAuthenticated } from "../middlewares/auth.js"

const router = express.Router()

router.post("/new", isAuthenticated, newTask)
router.get("/my", isAuthenticated, showTask)
router
  .route("/:id")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask)

export default router
