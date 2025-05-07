import { Router } from "express";
var router = Router();
import { v4 as uuidv4 } from "uuid";

let tasks = [];

router.get("/gettasks", (req, res, next) => { // localhost:3000/tasks/gettasks
  res.json(tasks);
});

router.post("/addtask", (req, res, next) => { // localhost:3000/tasks/addtask
  const { name, description, dueDate } = req.body;
  let id = uuidv4();
  console.log(id);

  if (name && description && dueDate) {
    req.body.id = id;
    tasks.push(req.body);
  }

  res.status(200).json(tasks);
});

router.delete("/removetask/:id", (req, res, next) => { // localhost:3000/tasks/removetask/:id
  const { id } = req.params;

  let index = tasks.findIndex((task) => task.id === id);

  if (index != -1) {
    tasks.splice(index, 1);
    res.status(200).json({ message: `Task with ID ${id} has been deleted.` });
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

export default router;
