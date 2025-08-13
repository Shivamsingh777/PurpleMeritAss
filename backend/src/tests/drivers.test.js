import request from "supertest";
import app from "../app.js";
let token;
beforeAll(async () => {
  const r = await request(app).post("/api/auth/login").send({ email: "m@a.com", password: "pass1234" });
  token = r.body.token;
});
test("list drivers (auth)", async () => {
  const res = await request(app).get("/api/drivers").set("Authorization","Bearer "+token).expect(200);
  expect(Array.isArray(res.body)).toBe(true);
});
