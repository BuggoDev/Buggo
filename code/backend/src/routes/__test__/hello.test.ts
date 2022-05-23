import request from "supertest";
import { app } from "../../app";

it("can send hello world", async () => {
  await request(app).get("/api/hello").send().expect(200);
});
