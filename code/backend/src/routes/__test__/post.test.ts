import request from "supertest";
import { app } from "../../app";
import { Post, PostType, PostStatus, UpdatePostAttrs } from "../../models/post";
import { User } from "../../models/user";
import { Project } from "../../models/project";
import { createUser, createPost, createProject } from "../../test/setup";

describe("test create post", () => {
  it("can create a new post on correct body", async () => {
    const authRes = await signin();
    const project_1 = await createProject("project_1", "junk");
    const body = {
      title: "12345", 
      body: "my body",
      post_type: "Bug Report",
      project: project_1.id,
    };
    await request(app)
      .post("/api/post")
      .set("Authorization", "Bearer " + authRes.token)
      .send(body)
      .expect(200);

    const postInstance = await Post.findOne(body);
    const userInstance = await User.findOne({ email: authRes.user.email });
    const projectInstance = await Project.findById(project_1.id);

    expect(body.title).toEqual(postInstance?.title);
    expect(body.body).toEqual(postInstance?.body);
    expect(userInstance!.id).toEqual(postInstance?.user.toString());
    expect(body.post_type).toEqual(postInstance?.post_type);
    // check that post id has been successfully added to user.posts
    expect(userInstance?.posts.includes(postInstance?.id)).toBeTruthy();
    expect(body.project).toEqual(projectInstance?.id);
  });

  it("returns 401 if unauthenticated", async () => {
    await request(app).post("/api/post").send().expect(401);
  });

  it("returns 400 on missing values", async () => {
    const authRes = await signin();
    const body = {};
    await request(app)
      .post("/api/post")
      .set("Authorization", "Bearer " + authRes.token)
      .send(body)
      .expect(400);
  });

  it("returns 400 on invalid values", async () => {
    const authRes = await signin();
    const body = { title: "12345", body: "", user: "123", post_type: "Random" };
    await request(app)
      .post("/api/post")
      .set("Authorization", "Bearer " + authRes.token)
      .send(body)
      .expect(400);
  });

  it("returns post when searched", async () => {
    const user = await createUser();
    const project_1 = await createProject("project_1", "junk");
    const post = await createPost(user.id, project_1.id);
    // title: new post, body: body
    const res = await request(app).get("/api/posts?user_input=new");
    expect(res.body.data.length).toBeGreaterThan(0);

    const res2 = await request(app).get("/api/posts?user_input=body");
    expect(res2.body.data.length).toBeGreaterThan(0);
  });
});

/*
describe("test update post", () => {
  it("can find and update a new post on correct body", async () => {
    const user = await createUser();
    const body = {
      title: "12345",
      body: "my body",
      user: user.id,
      post_type: "Bug Report",
    };
    await request(app).post("/api/post").send(body).expect(200);
    const postInstance = await Post.findOne(body);

    const updateBody = {
      title: "54321",
      body: "your body",
      post_type: PostType.FeatureRequest,
      status: PostStatus.InProgress,
      votes: 10,
      postID: postInstance?.id,
      list_of_upvotes: [],
      user: user.id,
    }

    await request(app).put("/api/update").send(updateBody).expect(200);

    const updatedInstance = await Post.findOne(updateBody);
    expect(updateBody.title).toEqual(updatedInstance?.title);
    expect(updateBody.body).toEqual(updatedInstance?.body);
    expect(updateBody.user).toEqual(updatedInstance?.user.toString());
    expect(updateBody.post_type).toEqual(updatedInstance?.post_type);
  });

  it("returns 400 on missing values", async () => {
    const body = {};
    await request(app).put("/api/update").send(body).expect(400);
  });
});

*/
