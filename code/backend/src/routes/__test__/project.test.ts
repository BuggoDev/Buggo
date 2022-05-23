import request from "supertest";
import { app } from "../../app";
import { Project } from "../../models/project";

describe("test create project", () => {
  it("can create a new project on correct body", async () => {
    const body = {
      name: "project_1",
      urlLogo: "junk",
      email: "mark@234.com",
    };
    await request(app).post("/api/project").send(body).expect(200);

    const projectInstance = await Project.findOne(body);

    expect(body.name).toEqual(projectInstance?.name);
    expect(body.urlLogo).toEqual(projectInstance?.urlLogo);
  });
});

describe("test obtain all project", () => {
  it("can receive all projects", async () => {
    const body1 = {
      name: "project_1",
      urlLogo: "junk",
      email: "mark@234.com"
    };
    await request(app).post("/api/project").send(body1).expect(200);

    const body2 = {
      name: "project_2",
      urlLogo: "junk",
      email: "mark@234.com",
    };
    await request(app).post("/api/project").send(body2).expect(200);

    const res = await request(app).get("/api/allProjects");
    expect(res.body.data.length).toBeGreaterThan(1);
  });
});
