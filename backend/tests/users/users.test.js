process.env.NODE_ENV = "autotest";
const resetDb = require("../../db/autoTest/testdb");
const request = require("supertest");
const app = require("../../app");

beforeAll(() => resetDb());

jest.setTimeout(30000);

describe("Test Users", () => {
  test("User Login", () => {
    return request(app)
      .post("/users/login")
      .send({})
      .then((res) => {
        console.log(res.body);
        expect(res.status).toBe(400);
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  });
});
