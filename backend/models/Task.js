const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Task = sequelize.define("Task", {
  title: { type: DataTypes.STRING, allowNull: false },
  description: DataTypes.TEXT,
  status: {
    type: DataTypes.ENUM("todo", "in-progress", "done"),
    defaultValue: "todo"
  },
  dueDate: DataTypes.DATE
});

module.exports = Task;