import {
  createComment,
  createPost,
  createUser,
  createProject,
} from "../../test/setup";
import { Post, PostStatus, PostType } from "../post";
import { User, UserDoc } from "../user";
import { Project, ProjectDoc } from "../project";

test("can create a post with a user", async () => {
  const user = await createUser();
  const project_1 = await createProject("project_1", "junk");

  const post = await createPost(user.id, project_1.id);
  // grab post with user populated
  const postInstance = await Post.findById(post.id)
    .populate<{ user: UserDoc }>("user")
    .populate<{ project: ProjectDoc }>("project");

  const userInstance = await User.findById(user.id);
  const projectInstance = await Project.findById(project_1.id);

  expect(postInstance).not.toBeNull();
  expect(postInstance?.title).toEqual(post.title);
  expect(postInstance?.body).toEqual(post.body);
  expect(postInstance?.post_type).toEqual(PostType.BugReport);

  // check if default fields are initialized correctly
  expect(postInstance?.votes).toEqual(0);
  expect(postInstance?.status).toEqual(PostStatus.Reported);
  expect(postInstance?.post_time).toBeInstanceOf(Date);

  // check post-user relationship, note that the reverse won't work
  // because we did not push the post instance to user.posts
  expect(postInstance?.user.id.toString()).toEqual(post.user.toString());

  // check post-project relationship
  expect(postInstance?.project.id.toString()).toEqual(post.project.toString());
  expect(postInstance?.project.name).toEqual(projectInstance?.name);
});

test("can add multiple comments to a post", async () => {
  const user = await createUser();
  const project_1 = await createProject("project_1", "junk");
  const post = await createPost(user.id, project_1.id);

  const postInstance = await Post.findById(post.id);

  const c1 = await createComment(user.id);
  const c2 = await createComment(user.id);

  postInstance?.comments.push(c1.id);
  postInstance?.comments.push(c2.id);

  await postInstance?.save();

  expect(postInstance?.comments.length).toEqual(2);
});
