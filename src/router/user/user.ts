import express, { Request, Response } from "express";
import fs from "fs-extra";
import { User } from "../../types/types";
import { nanoid } from "nanoid";

const userRouter = express.Router();

const uniqueId = nanoid();

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

  users.push({
    name,
    age,
    userName,
    userEmail,
    phoneNumber,
    password,
    userId: uniqueId,
  });

  fs.writeFileSync(filePath, JSON.stringify(users, null, 2), "utf-8");

  res.send("Login success");
});

userRouter.delete("/deleteUser", (req: Request, res: Response) => {
  const { userName } = req.body;

  const filePath = "./user.json";

  let users: User[] = [];

  if (fs.existsSync(filePath)) {
    const existingData = fs.readFileSync(filePath, "utf-8");
    if (existingData.trim().length > 0) {
      users = JSON.parse(existingData);
    }
  }

  const deletedUsers = users.filter((user) => user.userName !== userName);

  fs.writeFileSync(filePath, JSON.stringify(deletedUsers, null, 2), "utf-8");
  res.send(`deleted ${userName}`);
});

userRouter.put("/updateUser", (req: Request, res: Response) => {
  const {
    userName,
    name,
    age,
    userId,
  }: { name: string; age: number; userName: string; userId: string } = req.body;

  const filePath = "./user.json";
  try {
    const existingData = fs.readFileSync(filePath, "utf-8");

    const updateUser = JSON.parse(existingData).map((user: any) => {
      if (user.userId === userId) {
        return { ...user, name, age, userName };
      }
      return user;
    });

    fs.writeFileSync(filePath, JSON.stringify(updateUser, null, 2));

    res.json(updateUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
});

module.exports = userRouter;
