import express, { Request, Response } from "express";
import fs from "fs-extra";
import { User } from "../types/types";

const userRouter = express.Router();

userRouter.get("/users", (req: Request, res: Response) => {
  const users = fs.readFileSync("./user.json", {
    encoding: "utf-8",
    flag: "r",
  });
  res.json(JSON.parse(users));
});

userRouter.post("/createUser", (req: Request, res: Response) => {
  const { name, age, userName, userEmail, phoneNumber, password }: User =
    req.body;

  const filePath = "./user.json";

  let users: User[] = [];

  if (fs.existsSync(filePath)) {
    const existingData = fs.readFileSync(filePath, "utf-8");
    if (existingData.trim().length > 0) {
      users = JSON.parse(existingData);
    }
  }

  users.push({ name, age, userName, userEmail, phoneNumber, password, id: 1 });

  fs.writeFileSync(filePath, JSON.stringify(users, null, 2), "utf-8");

  res.send("Login success");
});

module.exports = userRouter;
