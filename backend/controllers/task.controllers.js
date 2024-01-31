import { TASK } from "../models/task.models.js"
import { errorHandler } from "../utils/error.js"

export const newTask = (req, res, next) => {
  try {
    const { message } = req.body

    if (message === "") next(400, "you must write something")

    TASK.create({ message, user: req.user })

    res.status(200).json({ success: true, message: "Task added successfully" })
  } catch (error) {
    next(error)
  }
}

export const showTask = async (req, res, next) => {
  try {
    const userID = req.user._id
    const tasks = await TASK.find({ user: userID })
    if (!tasks) next(400, "Tasks not found")
    res.status(200).json({ success: true, tasks })
  } catch (error) {
    next(error)
  }
}

export const updateTask = async (req, res, next) => {
  try {
    const { message, iscomplete } = req.body
    const task = await TASK.findById(req.params.id)

    if (!task) return next(errorHandler(401, "Task not found"))

    task.isComplete = iscomplete
    task.message = message
    await task.save()

    res.status(200).json({ success: true, message: "Task Updated" })
  } catch (error) {
    next(error)
  }
}

export const deleteTask = async (req, res, next) => {
  try {
    const task = await TASK.findById(req.params.id)
    if (!task) return next(errorHandler(401, "Task not found"))

    await task.deleteOne()
    res.status(200).json({ success: true, message: "Task Deleted" })
  } catch (error) {
    next(error)
  }
}
