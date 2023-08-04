const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const { userOneId, userOne, setupDataBase } = require("./fixtures/db");

beforeEach(setupDataBase);

test("Should signup a new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "sofiane",
      email: "sofianea@gmail.com",
      password: "mypass23!",
    })
    .expect(201);
  // Assert that the database is changed correctly
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();
  // Assertion about the response
  expect(response.body).toMatchObject({
    user: { name: "sofiane", email: "sofianea@gmail.com" },
    token: user.tokens[0].token,
  });
  // Assert that the password saved is not a plain text
  expect(user.password).not.toBe("mypass23!");
});

test("should login an existing user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
  const user = await User.findById(response.body.user._id);
  // Assert that the token in the response matches the user second token
  expect(response.body.token).toBe(user.tokens[1].token);
});

test("should not login unexisting user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: "okokokokok122",
    })
    .expect(400);
});

test("should get profile for user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("should not get profile for unauthenticated user", async () => {
  await request(app).get("/users/me").send().expect(401);
});

test("should delete acount", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  // Assert null response after the user gets deleted
  const user = await User.findById(userOneId);
  expect(user).toBeNull();
});

test("should not delete acount for unauthenticated users", async () => {
  await request(app).delete("/users/me").send().expect(401);
});

test("should upload avatar image", async () => {
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("avatar", "tests/fixtures/profile-pic.jpg")
    .expect(200);
  const user = await User.findById(userOneId);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

// test user updates
test("Should update valid user fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ name: "suzy" });
  expect(200);
  const user = await User.findById(userOneId);
  expect(user.name).toEqual("suzy");
});

test("Should not update invalid user fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ location: "london" });
  expect(400);
});
