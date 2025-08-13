import request from "supertest";
import app from "../app.js";
let token;
beforeAll(async () => {
  const r = await request(app).post("/api/auth/login").send({ email: "m@a.com", password: "pass1234" });
  token = r.body.token;
});
test("create route denies duplicate routeId", async () => {
  await request(app).post("/api/routes")
    .set("Authorization","Bearer "+token)
    .send({ routeId: "R2", distanceKm: 8, trafficLevel: "Low", baseTimeMin: 40 })
    .expect(409);
});
