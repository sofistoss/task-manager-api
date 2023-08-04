const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/task");
const {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  taskOne,
  taskTwo,
  taskThree,
  setupDataBase,
} = require("./fixtures/db");
const Task = require("../src/models/task");

beforeEach(setupDataBase);

test("Should creat task for user", async () => {
  const response = await request(app)
    .post("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      description:
        "A worker process has failed to exit gracefully and has been force exited. This is likely caused by tests leaking due to improper teardown. Try running with --detectOpenHandles to find leaks",
    })
    .expect(201);
  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task.completed).toEqual(false);
});

test("should fetch user tasks", async () => {
  const response = await request(app)
    .get("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  expect(response.body.length).toEqual(2);
});

test("Should not delete other users tasks", async () => {
  await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set("Athorization", `Bearer ${userTwo.tokens[0].token}`)
    .expect(401);
  const task = await Task.findById(taskOne.id);
  expect(task).not.toBeNull;
});
