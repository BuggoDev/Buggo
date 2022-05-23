import { createPost, createUser, createProject } from "../../test/setup";
import { Post, PostDoc } from "../post";
import { User } from "../user";
import { Project } from "../project";

test("can create a user", async () => {
  const user = await createUser();
  const userInstance = await User.findById(user.id);
  expect(userInstance).not.toBeNull();

  expect(userInstance?.comments.length).toEqual(0);
  expect(userInstance?.posts.length).toEqual(0);
});

test("user can have multiple posts", async () => {
  const user = await createUser();
  const project_1 = await createProject("project_1", "junk");

  const p1 = await createPost(user.id, project_1.id);
  const p2 = await createPost(user.id, project_1.id);
  const p3 = await createPost(user.id, project_1.id);

  user?.posts.push(p1.id);
  user?.posts.push(p2.id);
  user?.posts.push(p3.id);

  await user?.save();

  const userInstance = await User.findById(user.id).populate<{
    posts: PostDoc[];
  }>("posts");

  expect(userInstance?.posts.length).toEqual(3);

  // test that the reverse relationship also works
  userInstance?.posts.forEach((post: PostDoc) => {
    expect(post.user.toString()).toStrictEqual(userInstance.id.toString());
  });
});
