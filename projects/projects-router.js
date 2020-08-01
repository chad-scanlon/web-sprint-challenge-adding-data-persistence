const express = require("express");
const Projects = require("../data/helpers/project-model.js");
// const Resources = require("../data/helpers/resource-model.js");
// const Tasks = require("../data/helpers/task-model.js");
const router = express.Router();

// get the projects
router.get("/", (req, res) => {
  Projects.findProjects(res.body)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error retrieving the project" });
    });
});
router.get("/:id", (req, res) => {
  Projects.findById(req.params.id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error retrieving the project" });
    });
});

// add a project
router.post("/", (req, res) => {
  Projects.addProject(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error adding the project" });
    });
});

// get ProjectResources
router.get("/:id/resources", (req, res) => {
  Projects.findResources(req.params.id)
    .then((project) => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: "No resource to be found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error getting the resource" });
    });
});
// add a resource
router.post("/:id/resources", (req, res) => {
  const resourceData = { ...req.body, project_id: req.params.id };
  const { id } = req.params;
  Projects.findById(id)
    .then((project) => {
      if (project) {
        Projects.addResource(resourceData, id).then((resource) => {
          res.status(201).json(resourceData);
        });
      } else {
        res
          .status(404)
          .json({ message: "Could not find resource with given id." });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error adding the resource" });
    });
});

// get ProjectTasks
router.get("/:id/tasks", (req, res) => {
  Projects.findTasks(req.params.id)
    .then((task) => {
      if (task) {
        res.status(200).json(task);
      } else {
        res.status(404).json({ message: "No task to be found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error getting the resource" });
    });
});
// add a task
router.post("/:id/tasks", (req, res) => {
  const taskData = { ...req.body, project_id: req.params.id };
  const { id } = req.params;
  Projects.findById(id)
    .then((project) => {
      if (project) {
        Projects.addTask(taskData, id).then((task) => {
          res.status(201).json(taskData);
        });
      } else {
        res.status(404).json({ message: "Could not find task with given id." });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error adding the resource" });
    });
});
// remove a project
router.delete("/:id", (req, res) => {
  Projects.removeProject(req.params.id).then((count) => {
    if (count > 0) {
      res.status(200).json({ message: "That project gone" });
    } else {
      res.status(404).json({ message: "Where that project be?" });
    }
  });
});

module.exports = router;
