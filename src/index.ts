import express, { Request, Response } from "express";

const app = express();
const port = 3000;
app.use(express.json());

const userRouter = require("./router/user/user");

app.use("/", userRouter);

app.listen(3000, () => {
  console.log(`Example app listening on port http://localhost:3000`);
});
