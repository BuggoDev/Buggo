import request from "supertest";
import { app } from "../../app";
import { createUser } from "../../test/setup";

it("can sign up user", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(200);
});

it("can sign in user", async () => {
  const user = await createUser();
  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: user.email,
      password: "1234567",
    })
    .expect(200);
});

it("responds with 400 after wrong password", async () => {
  const user = await createUser();
  await request(app)
    .post("/api/users/signin")
    .send({
      email: user.email,
      password: "wrong password",
    })
    .expect(400);
});

it("responds with 400 after nonexistant user", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "non existant",
      password: "wrong password",
    })
    .expect(400);
});

it("responds with details about the current user", async () => {
  const authRes = await signin();

  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Authorization", "Bearer " + authRes.token)
    .send()
    .expect(200);
  expect(response.body.currentUser.email).toEqual("test@test.com");
});

it("responds with null if not authed", async () => {
  const response = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(200);
  expect(response.body.currentUser).toEqual(null);
});
