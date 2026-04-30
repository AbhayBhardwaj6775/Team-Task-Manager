const router = require("express").Router();
const { Task } = require("../models");
const auth = require("../middleware/auth");

// CREATE TASK
router.post("/", auth, async (req, res) => {
  try {
    const { title, projectId, assignedTo } = req.body;

    if (!title || !projectId || !assignedTo) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const task = await Task.create(req.body);

    res.json(task);

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// GET TASKS
router.get("/", auth, async (req, res) => {
  try {
    let tasks;

    if (req.user.role === "admin") {
      tasks = await Task.findAll();
    } else {
      tasks = await Task.findAll({
        where: { assignedTo: req.user.id }
      });
    }

    res.json(tasks);

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// UPDATE TASK STATUS
router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    if (req.user.role === "member" && task.assignedTo !== req.user.id) {
      return res.status(403).json({ msg: "Not allowed" });
    }

    task.status = req.body.status;
    await task.save();

    res.json(task);

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// DASHBOARD
router.get("/dashboard", auth, async (req, res) => {
  try {
    const tasks = await Task.findAll();

    const now = new Date();

    const overdue = tasks.filter(
      t => t.dueDate && new Date(t.dueDate) < now && t.status !== "done"
    );

    const completed = tasks.filter(t => t.status === "done");
    const pending = tasks.filter(t => t.status !== "done");

    res.json({
      total: tasks.length,
      completed: completed.length,
      pending: pending.length,
      overdue: overdue.length
    });

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;