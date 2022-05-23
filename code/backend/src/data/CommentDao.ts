import { NotFoundError } from "../errors/not-found-error";
import { Comment } from "../models/comment";
import { Post } from "../models/post";
import { User } from "../models/user";

export class CommentDao {
  async create(postID: any, body: string, userID: any) {
    const comment = Comment.build({
      body: body,
      user: userID,
    });
    await comment.save();

    await User.findByIdAndUpdate(userID, {
      $push: { comments: comment.id },
    });

    const parentPost = await Post.findById(postID);
    if (!parentPost) {
      throw new NotFoundError();
    }
    parentPost.comments.push(comment.id);
    await parentPost.save();
    const fullUser = await User.findById(userID);

    return {
      id: comment._id.toString(),
      body: comment.body,
      user: fullUser,
      votes: comment.votes,
      post_time: comment.post_time,
    };
  }

  async getCommentList(allPosts: any) {
    let allComments: any[][] = [];
    let i = 0;
    for (let post of allPosts) {
      let tempList: any[] = [];
      for (let commentID of post.comments) {
        const comment = await this.find(commentID);
        tempList.push(comment);
      }
      allComments[i] = [...tempList];
      i++;
    }
    return allComments;
  }

  async find(CommentId: any) {
    // let query;
    // query = await Comment.findById(CommentId);
    // const comment = await query.exec();
    const comment = await Comment.findById(CommentId);
    return comment;
  }

  async createFromIssues(postIDList: any[], commentBodyLists: any[][]) {
    for (let i = 0; i < postIDList.length; i++) {
      const currentID = postIDList[i].id;
      for (const comment of commentBodyLists[i]) {
        const body = comment.body;
        const github_login = comment.user.login;
        let existingUser = await User.findOne({ github_login });
        if (!existingUser) {
          const user = User.build({
            email: null,
            github_login: github_login,
          });
          await user.save();
          existingUser = await User.findOne({ github_login });
        }
        await this.create(currentID, body, existingUser?.id);
      }
    }
  }
}
