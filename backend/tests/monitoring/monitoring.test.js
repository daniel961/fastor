process.env.NODE_ENV = "autotest";
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../app");

afterAll(async () => {
  mongoose.connection.close();
});

describe("ping test", function () {
  it("responds with text ping", async function () {
    try {
      const res = await request(app).get("/monitoring/ping");
      expect(res.status).toBe(200);
      expect(res.body.data).toBe("alive");
    } catch (err) {
      console.log(err);
      throw err;
    }
  });
});
