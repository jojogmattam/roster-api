const express = require("express");
const Router = express.Router();
const { rosterDB } = require("../db");
const { validateFields } = require("../middleware");

Router.get("/id/:userId", (req, res) => {
  const { userId } = req.params;

  res.json(rosterDB.getOneStudent(userId));
});

// GET 

Router.get("/", (req, res) => {
  const { name, location } = req.query;
  const results = rosterDB.getStudents({ name, location });

  if (!name && !location) {
    return res.json(rosterDB);
  }

  res.json(results);
  console.table(results);
});

// CREATE / POST

Router.post("/", validateFields, (req, res) => {
  const { name, location } = req.body;

  const newStudent = rosterDB.addStudent({ name, location });

  res.json(newStudent);
  console.table(rosterDB);
});

// UPDATE / PUT

Router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, location } = req.body;

  if (!name || !location) {
    return res
      .status(400)
      .json({ error: "Please provide a name and location" });
  }

  const student = rosterDB.updateStudent(id, { name, location });

  if (student === null) {
    return res.status(404).json({ error: "Student not found" });
  }

  rosterDB.updateStudent(id, { name, location });
  res.json(student);
  console.table(rosterDB);
});

// DELETE

Router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const student = rosterDB.deleteStudent(id);

  if (student === null) {
    return res.status(404).json({ error: "Student not found" });
  }

  rosterDB.deleteStudent(id);

  res.json(student);
  console.table(rosterDB);
});

module.exports = Router;
