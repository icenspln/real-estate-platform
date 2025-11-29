/* eslint-disable no-undef */
const request = require("supertest");
const setupTestDB = require("./setupTestDB");
const createApp = require("../../app");
const JWT = require("jsonwebtoken");
require("dotenv").config();

let sequelize, models, app;

beforeAll(async () => {
  // just destructuring into existing variables (for scoping)
  ({ sequelize, models } = await setupTestDB());
  app = createApp({ sequelize, models });
});

afterAll(async () => {
  sequelize.close();
});

describe("testing API /auth", () => {
  test("should signup a guest user", async () => {
    const res = await request(app).post("/auth/signup").send({
      firstName: "user1",
      lastName: "user1",
      email: "user1@email.com",
      role: "guest",
      password: "guest123",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBeTruthy();
  });

  test("should fail signing up existing user", async () => {
    const res = await request(app).post("/auth/signup").send({
      firstName: "user1",
      lastName: "user1",
      email: "user1@email.com",
      role: "guest",
      password: "guest123",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.success).toBeFalsy();
  });

  test("should sign up an agent user", async () => {
    const res = await request(app).post("/auth/signup").send({
      firstName: "agent1",
      lastName: "agent1",
      email: "agent1@email.com",
      role: "agent",
      password: "agent123",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBeTruthy();
  });

  test("should loging as guest", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "user1@email.com",
      password: "guest123",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.token).toBeTruthy();

    const decoded = JWT.decode(res.body.token);

    expect(res.body.token).toBeTruthy();
    expect(decoded.role).toEqual("guest");
  });

  test("should loging as agent", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "agent1@email.com",
      password: "agent123",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.token).toBeTruthy();

    const decoded = JWT.decode(res.body.token);

    expect(res.body.token).toBeTruthy();
    expect(decoded.role).toEqual("agent");
  });
});

describe("testing API /bootstrap", () => {
  test("should fail creating the first admin with invalid token", async () => {
    const res = await request(app)
      .post(`/bootstrap/admin?token=${process.env.ADMIN_TOKEN}1`)
      .send({
        firstName: "admin1",
        lastName: "admin1",
        email: "admin@administration.com",
        role: "admin",
        password: "admin123",
      });
    expect(res.statusCode).toEqual(401);
  });

  test("should create the first admin", async () => {
    const res = await request(app)
      .post(`/bootstrap/admin?token=${process.env.ADMIN_TOKEN}`)
      .send({
        firstName: "admin1",
        lastName: "admin1",
        email: "admin@administration.com",
        role: "admin",
        password: "admin123",
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBeTruthy();
  });

  test("should fail creating the second admin", async () => {
    const res = await request(app)
      .post(`/bootstrap/admin?token=${process.env.ADMIN_TOKEN}`)
      .send({
        firstName: "admin2",
        lastName: "admin2",
        email: "admin2@administration.com",
        role: "admin",
        password: "admin123",
      });
    expect(res.statusCode).toEqual(403);
  });

  test("should loging as admin", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "admin@administration.com",
      password: "admin123",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body.token).toBeTruthy();

    const decoded = JWT.decode(res.body.token);

    expect(res.body.token).toBeTruthy();
    expect(decoded.role).toEqual("admin");
  });
});
