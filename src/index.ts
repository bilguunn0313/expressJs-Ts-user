import express from "express";

const app = express();
const port = 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send({
    name: "bilguun",
    age: "234",
  });
});
app.post("/user", (req, res) => {
  const { name, age } = req.body;
  res.json({ message: `User ${name} is ${age} years old` });
});

app.listen(3000, () => {
  console.log(`Example app listening on port http://localhost:3000`);
});
