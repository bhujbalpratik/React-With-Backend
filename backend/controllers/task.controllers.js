import { TASK } from "../models/task.models.js"

export const newTask = (req, res, next) => {
  const { message } = req.body

  TASK.create({ message, user: req.user })

  res.status(200).json({ success: true, message: "Task added successfully" })
}

export const showTask = async (req, res, next) => {
  const userID = req.user._id
  const tasks = await TASK.find({ user: userID })
  res.status(200).json({ success: true, tasks })
}

export const updateTask = async (req, res) => {
  const { message } = req.body
  const task = await TASK.findById(req.params.id)

  if (!task)
    return res.status(401).json({ success: false, message: "Task not found" })

  task.isComplete = !task.isComplete
  task.message = message
  await task.save()

  res.status(200).json({ success: true, message: "Task Updated" })
}

export const deleteTask = async (req, res) => {
  const task = await TASK.findById(req.params.id)
  if (!task)
    return res.status(401).json({ success: false, message: "Task not found" })
  await task.deleteOne()
  res.status(200).json({ success: true, message: "Task Deleted" })
}
