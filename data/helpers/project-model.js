const db = require("../db-config.js");

module.exports = {
  findProjects,
  addProject,
  removeProject,
  findById,
  findResources,
  addResource,
  findTasks,
  addTask,
};

function findProjects() {
  return db("projects");
}
function addProject(project) {
  return db("projects")
    .insert(project)
    .then((ids) => {
      return findById(ids[0]);
    });
}
function removeProject(id) {
  return db("projects").where({ id }).del();
}
function findResources(id) {
  return db("resources")
    .join("projects", "project_id", "projects.id")
    .select(
      "resources.id",
      "resources.resource_name",
      "resource_description",
      "projects.project_name"
    )
    .where({ project_id: id });
}
function addResource(resource) {
  return db("resources")
    .join("projects", "resources.id", "projects.id")
    .select("resources.id", "projects.project_name")
    .where({ project_id: resource.id })
    .first()
    .insert(resource)
    .then((ids) => {
      return findById(ids[0]);
    });
}
function findTasks(id) {
  return db("tasks")
    .join("projects", "project_id", "projects.id")
    .select(
      "tasks.id",
      "tasks.task_notes",
      "tasks.task_description",
      "projects.project_name",
      "projects.project_description"
    )
    .where({ project_id: id });
}
function addTask(task) {
  return db("tasks")
    .join("projects", "tasks.id", "projects.id")
    .select("tasks.id", "projects.project_name")
    .where({ project_id: task.id })
    .insert(task)
    .then((ids) => {
      return findById(ids[0]);
    });
}
function findById(id) {
  return db("projects").where({ id }).first();
}
