const router = require("express").Router();
const { Project, User } = require("../models");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

// CREATE PROJECT (Admin only)
router.post("/", auth, role("admin"), async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ msg: "Project name required" });
    }

    const project = await Project.create({
      name,
      description,
      createdBy: req.user.id
    });

    res.json(project);

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// ADD MEMBER TO PROJECT
router.post("/:id/add-member", auth, role("admin"), async (req, res) => {
  try {
    const { userId } = req.body;

    const project = await Project.findByPk(req.params.id);
    const user = await User.findByPk(userId);

    if (!project || !user) {
      return res.status(404).json({ msg: "Project or User not found" });
    }

    await project.addUser(user);

    res.json({ msg: "Member added successfully" });

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// GET PROJECTS
router.get("/", auth, async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: User
    });

    res.json(projects);

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;