import request from "supertest";
import { app } from "../../app";
import { Post } from "../../models/post";
import { Comment } from "../../models/comment";
import { createPost, createUser, createProject } from "../../test/setup";

describe("test create comment", () => {
  it("can create a new comment on correct body", async () => {
    /**
     * First create a post
     */
    const user = await createUser();
    const project_1 = await createProject("project_1", "junk");
    const post = await createPost(user.id, project_1.id);
    const postInstance = await Post.findById(post.id);

    /**
     * Create the Comment now
     */
    const bodyComment = {
      body: "comment body",
      postID: postInstance?.id,
    };
    const authRes = await signin();
    await request(app)
      .post("/api/comment")
      .set("Authorization", "Bearer " + authRes.token)
      .send(bodyComment)
      .expect(200);
    const commentInstance = await Comment.findOne(bodyComment);
    expect(bodyComment.body).toEqual(commentInstance?.body);

    const postInstanceAfter = await Post.findById(post.id);
    expect(postInstanceAfter?.comments.length).toEqual(1);
    expect(postInstanceAfter?.comments[0].toString()).toEqual(
      commentInstance?.id
    );
  });

  it("returns 400 on missing values", async () => {
    const body = {};
    const authRes = await signin();
    await request(app)
      .post("/api/comment")
      .set("Authorization", "Bearer " + authRes.token)
      .send(body)
      .expect(400);
  });

  it("returns 400 on invalid values", async () => {
    const body = { body: "1", postID: "123" };
    const authRes = await signin();
    await request(app)
      .post("/api/comment")
      .set("Authorization", "Bearer " + authRes.token)
      .send(body)
      .expect(400);
  });
});
