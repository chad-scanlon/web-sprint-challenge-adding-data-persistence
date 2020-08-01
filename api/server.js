const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const projectsRouter = require("../projects/projects-router.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/projects", projectsRouter);
server.get("/", (req, res) => {
  res.send({
    Message: "Server is working",
  });
});

module.exports = server;
