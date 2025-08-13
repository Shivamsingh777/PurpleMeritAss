import request from "supertest";
import app from "../app.js";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";

beforeAll(async () => connectDB(process.env.MONGO_URI));
afterAll(async () => mongoose.connection.close());

let token;
test("register + login manager", async () => {
  await request(app).post("/api/auth/register").send({ email: "m@a.com", password: "pass1234" }).expect(201);
  const res = await request(app).post("/api/auth/login").send({ email: "m@a.com", password: "pass1234" }).expect(200);
  expect(res.body.token).toBeDefined();
  token = res.body.token;
});
