/* eslint-disable no-undef */
const request = require("supertest");
const setupTestDB = require("./setupTestDB");
const createApp = require("../app");
require("dotenv").config();

let sequelize, models, app;

beforeAll(async () => {
  // just destructuring into existing variables (for scoping)
  ({ sequelize, models } = await setupTestDB());
  app = createApp({ sequelize, models });
});

afterAll(() => {
  sequelize.close();
});

describe("testing API /auth", () => {
  test("should signup user", async () => {
    const res = await request(app).post("/auth/signup").send({
      firstName: "jsonmomoa",
      lastName: "somelastname",
      username: "michael jackson",
      email: "sendmespamplease@homelone.me",
      role: "guest",
      password: "guest123",
    });
    expect(res.statusCode).toEqual(201);
  });

  test("should fail signing up existing user", async () => {
    const res = await request(app).post("/auth/signup").send({
      firstName: "jsonmomoa",
      lastName: "somelastname",
      username: "michael jackson",
      email: "sendmespamplease@homelone.me",
      role: "guest",
      password: "guest123",
    });
    expect(res.statusCode).toEqual(400);
  });

  test("should sign up another user", async () => {
    const res = await request(app).post("/auth/signup").send({
      firstName: "jsonmomoa",
      lastName: "somelastname",
      username: "michael jackson",
      email: "sendmespamplease1@homelone.me",
      role: "guest",
      password: "guest123",
    });
    expect(res.statusCode).toEqual(201);
  });

  test("should loging", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "sendmespamplease1@homelone.me",
      password: "guest123",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.token).toBeTruthy();
  });
});

describe("testing API /bootstrap", () => {
  test("should fail creating the first admin with invalid token", async () => {
    const res = await request(app)
      .post(`/bootstrap/admin?token=${process.env.ADMIN_TOKEN}1`)
      .send({
        firstName: "jsonmomoa",
        lastName: "somelastname",
        username: "michael jackson",
        email: "newadminlikeemail@privatelife.lol",
        role: "admin",
        password: "guest123",
      });
    expect(res.statusCode).toEqual(401);
  });

  test("should create the first admin", async () => {
    const res = await request(app)
      .post(`/bootstrap/admin?token=${process.env.ADMIN_TOKEN}`)
      .send({
        firstName: "jsonmomoa",
        lastName: "somelastname",
        username: "michael jackson",
        email: "newadminlikeemail@privatelife.lol",
        role: "admin",
        password: "guest123",
      });
    expect(res.statusCode).toEqual(201);
  });

  test("should fail creating the second admin", async () => {
    const res = await request(app)
      .post(`/bootstrap/admin?token=${process.env.ADMIN_TOKEN}`)
      .send({
        firstName: "jsonmomoa",
        lastName: "somelastname",
        username: "michael jackson",
        email: "sendmespamplease91@homelone.me",
        role: "admin",
        password: "guest123",
      });
    expect(res.statusCode).toEqual(403);
  });
});
