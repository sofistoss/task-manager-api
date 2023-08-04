const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../../src/models/user");
const Task = require("../../src/models/task");

const userOneId = mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "sofiane",
  email: "sofiane@gmail.com",
  password: "mypass1!",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
};

const userTwoId = mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  name: "michel",
  email: "michel@gmail.com",
  password: "mypass2!",
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET),
    },
  ],
};

const taskOne = {
  _id: mongoose.Types.ObjectId(),
  description: "First Task",
  completed: false,
  owner: userOneId,
};

const taskTwo = {
  _id: mongoose.Types.ObjectId(),
  description: "Second Task",
  completed: true,
  owner: userOneId,
};

const taskThree = {
  _id: mongoose.Types.ObjectId(),
  description: "Third Task",
  completed: false,
  owner: userTwoId,
};

const setupDataBase = async () => {
  await User.deleteMany();
  await Task.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Task(taskOne).save();
  await new Task(taskTwo).save();
  await new Task(taskThree).save();
};

module.exports = {
  userOneId,
  userTwoId,
  userOne,
  userTwo,
  taskOne,
  taskTwo,
  taskThree,
  setupDataBase,
};
