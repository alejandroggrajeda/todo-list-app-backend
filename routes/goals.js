import { Router } from "express";
var router = Router();
import { v4 as uuidv4 } from "uuid";

let goals = [];

router.get("/getgoals", (req, res, next) => { // localhost:3000/goals/getgoals
  res.json(goals);
});

router.post("/addgoal", (req, res, next) => { // localhost:3000/goals/addgoal
  const { name, description, dueDate } = req.body;
  let id = uuidv4();
  console.log(id);

  if (name && description && dueDate) {
    req.body.id = id;
    goals.push(req.body);
  }

  res.status(200).json(goals);
});

router.delete("/removegoal/:id", (req, res, next) => {   // localhost:3000/goals/removegoal/:id
  const { id } = req.params;

  let index = goals.findIndex((goal) => goal.id === id);

  if (index != -1) {
    goals.splice(index, 1);
    res.status(200).json({ message: `Goal with ID ${id} has been deleted.` });
  } else {
    res.status(404).json({ message: "Goal not found" });
  }
});

export default router;
