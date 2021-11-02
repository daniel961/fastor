process.env.NODE_ENV = "autotest";
const mongoose = require("mongoose");
const Users = require("../../models/user");
const { finish, start, reset } = require("../../db/autoTest/testdb");
const request = require("supertest");
const app = require("../../app");
const {
  loginRequest,
  loginRequestFail,
  registerRequest,
} = require("./testMocks");

beforeAll(async () => {
  await reset(); // reset db
});

afterAll(async () => {
  await finish(); // clear db
  mongoose.connection.close();
});

jest.setTimeout(30000);

describe("Test Users", () => {
  it("user login", async () => {
    const response = await request(app).post("/users/login").send(loginRequest);
    expect(response.status).toBe(200);
    const { body } = response;
    expect(body).toHaveProperty("token");
    expect(body).toHaveProperty("completeRegisteration");
  });

  // it("User Login Fail not exist", async () => {
  //   const response = await request(app)
  //     .post("/users/login")
  //     .send(loginRequestFail);
  //   expect(response.status).toBe(400);
  //   const { body } = response;
  //   console.log(body);
  //   expect(body).toHaveProperty("token");
  //   expect(body).toHaveProperty("completeRegisteration");
  // });

  // it("User Register", async () => {
  //   const response = await request(app)
  //     .post("/users/register")
  //     .send(registerRequest);
  //   expect(response.status).toBe(200);
  //   const { body } = response;
  //   expect(body).toHaveProperty("token");
  //   expect(body).toHaveProperty("completeRegisteration");
  // });
});
