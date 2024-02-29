const express = require("express");
const router = express.Router();
let { people } = require("../data");

router.get("/", (req, res) => {
  res.status(200).json({ success: true, data: people });
});
router.post("/", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .send({ success: false, msg: "Please prvide a name" });
  }
  res.status(201).json({ success: true, person: name });
});

router.post("/postman", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send("Please provide a name value");
  }
  res.status(200).json({ success: true, data: [...people, name] });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const person = people.find((person) => person.id === Number(id));
  if (!person) {
    res.status(404).json({ success: false, data: `no person with id ${id}` });
  } else {
    const newPerson = people.map((person) => {
      if (person.id === Number(id)) {
        person.name = name;
      }
      return person;
    });
    res.status(200).json({ success: true, data: newPerson });
  }
});

router.delete("/:id", (req, res) => {
  const person = people.find((person) => person.id === Number(req.params.id));
  if (!person) {
    return res.status(400).send(`There is no person with id ${req.params.id}`);
  }
  const newPeople = people.filter(
    (person) => person.id !== Number(req.params.id)
  );
  // console.log(newPeople);
  return res.status(200).json(newPeople);
});

module.exports = router;
