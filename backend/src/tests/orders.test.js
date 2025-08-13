import request from "supertest";
import app from "../app.js";
let token;
beforeAll(async () => {
  const r = await request(app).post("/api/auth/login").send({ email: "m@a.com", password: "pass1234" });
  token = r.body.token;
});
test("create order and fetch it", async () => {
  const created = await request(app).post("/api/orders")
    .set("Authorization","Bearer "+token)
    .send({ orderId: "O9999", valueRs: 2000, routeRef: "R1", deliveryTimestamp: new Date().toISOString() })
    .expect(201);
  const fetched = await request(app).get(`/api/orders/${created.body._id}`).set("Authorization","Bearer "+token).expect(200);
  expect(fetched.body.orderId).toBe("O9999");
});