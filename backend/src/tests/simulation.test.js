import request from "supertest";
import app from "../app.js";
let token;
beforeAll(async () => {
  const r = await request(app).post("/api/auth/login").send({ email: "m@a.com", password: "pass1234" });
  token = r.body.token;
});
test("run simulation", async () => {
  const res = await request(app).post("/api/simulations/run")
    .set("Authorization","Bearer "+token)
    .send({ numDrivers: 2, routeStartHHMM: "09:00", maxHoursPerDriver: 8 })
    .expect(201);
  expect(res.body.kpis).toBeDefined();
  expect(typeof res.body.kpis.totalProfit).toBe("number");
});