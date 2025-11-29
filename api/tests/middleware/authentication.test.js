/* eslint-disable no-undef */
const authentication = require("../../middleware/authentication");
const JWT = require("jsonwebtoken");
require("dotenv").config();

describe("testing authentication middleware", () => {
  test("should fail with wrong token", () => {
    let next = jest.fn();
    let req = { header: (_str) => "Bearer XXXX" };
    let res = { json: jest.fn(), send: jest.fn(), status: jest.fn() };
    authentication(req, res, next);
    expect(next.mock.calls).toHaveLength(1);
    expect(next.mock.calls[0][0] instanceof Error).toBe(true);
  });

  test("should fail with wrong scheme", () => {
    let next = jest.fn();
    // missing capitalization
    let req = {
      header: (_str) => `bearer ${process.env.VALID_TEST_JWT}`,
      user: {},
    };
    let res = { json: jest.fn(), send: jest.fn() };
    authentication(req, res, next);
    expect(next.mock.calls).toHaveLength(1);
    expect(next.mock.calls[0][0] instanceof Error).toBe(true);
  });

  test("should succeed with corrent token", () => {
    let req = {
      header: (_str) =>
        `Bearer ${JWT.sign({ userId: 999 }, process.env.JWT_SECRET)}`,
    };
    let res = { json: jest.fn(), send: jest.fn() };
    let next = jest.fn();

    authentication(req, res, next);

    expect(next.mock.calls).toHaveLength(1);
    expect(req.user.userId).toBeTruthy();
    // mock function called with no arguemnts: next()
    expect(next.mock.calls[0][0]).toBeFalsy();
  });
});
