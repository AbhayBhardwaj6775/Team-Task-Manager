const sequelize = require("../config/db");
const User = require("./User");
const Project = require("./Project");
const Task = require("./Task");

User.hasMany(Project, { foreignKey: "createdBy" });
Project.belongsTo(User, { foreignKey: "createdBy" });

Project.belongsToMany(User, { through: "ProjectMembers" });
User.belongsToMany(Project, { through: "ProjectMembers" });

User.hasMany(Task, { foreignKey: "assignedTo" });
Task.belongsTo(User, { foreignKey: "assignedTo" });

Project.hasMany(Task, { foreignKey: "projectId" });
Task.belongsTo(Project, { foreignKey: "projectId" });

module.exports = { sequelize, User, Project, Task };