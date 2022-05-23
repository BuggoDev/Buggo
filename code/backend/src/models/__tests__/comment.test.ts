import { createComment, createUser } from "../../test/setup";
import { Comment } from "../comment";

test("can create a new comment", async () => {
  const user = await createUser();
  const comment = await createComment(user.id);
  const commentInstance = await Comment.findById(comment.id);
  expect(commentInstance).not.toBeNull();
  expect(commentInstance?.body).toEqual(comment.body);

  expect(commentInstance?.votes).toEqual(0);
  expect(commentInstance?.post_time).toBeInstanceOf(Date);
});

it("can have multiple replies", async () => {
  const user = await createUser();
  const comment = await createComment(user.id);

  await comment.save();

  const commentInstance = await Comment.findById(comment.id);

});
