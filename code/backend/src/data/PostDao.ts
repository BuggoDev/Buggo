import { Post, PostAttrs, UpdatePostAttrs } from "../models/post";
import { User } from "../models/user";
import { SearchQuery } from "../models/search";
import { NotFoundError } from "../errors/not-found-error";

class PostDao {
  async create(attrs: PostAttrs) {
    const data = await Post.create(attrs);
    // update the reverse relationship
    await User.findByIdAndUpdate(attrs.user, {
      $push: { posts: data.id },
    });
    return data;
  }

  async update(postID: any, attrs: UpdatePostAttrs) {
    const post = await Post.findById(postID);
    if (!post) {
      throw new NotFoundError();
    }
    post.title = attrs.title;
    post.body = attrs.body;
    post.post_type = attrs.post_type;
    post.status = attrs.status;
    post.votes = attrs.votes;
    post.list_of_upvotes = [...attrs.list_of_upvotes];
    post.project = attrs.project;

    await post.save();
  }

  async incrementUpvote(postID: any, email: string, cost: number) {
    const post = await Post.findById(postID);
    if (!post) {
      throw new NotFoundError();
    }

    if (cost === 1) {
      post.votes = post.votes + cost;
      post.list_of_upvotes = [...post.list_of_upvotes, email];
    } else if (cost === -1) {
      post.votes = post.votes + cost;
      const index = post.list_of_upvotes.indexOf(email);
      if (index > -1) {
        post.list_of_upvotes.splice(index, 1); // 2nd parameter means remove one item only
      }
    }

    await post.save();
  }

  async isUserSubscribed(postID: any, email: string) {
    const post = await Post.findById(postID);
    if (post) {
      return post.subscribed_emails.includes(email);
    }
    return false;
  }

  async addToEmailList(postID: any, email: string) {
    await Post.findByIdAndUpdate(postID, {
      $push: { subscribed_emails: email },
    });
  }

  async removeFromEmailList(postID: any, email: string) {
    console.log(`${email} has been unsubscribed from ${postID}`);
    await Post.findByIdAndUpdate(postID, {
      $pull: { subscribed_emails: email },
    });
  }

  // async list(params: SearchQuery) {
  //   let query;
  //   if (params.user_input) {
  //     query = Post.find({
  //       title: new RegExp(params.user_input),
  //       $options: "i", // case insensitive
  //     });
  //   } else {
  //     query = Post.find();
  //   }
  //   if (params.fields) {
  //     query.select(params.fields);
  //   }
  //   if (params.sort) {
  //     query.sort(params.sort);
  //   }
  //   if (params.limit && params.skip) {
  //     query.limit(params.limit).skip(params.skip);
  //   }
  //   if (params.post_type) {
  //     query.where("post_type").equals(params.post_type);
  //   }
  //   if (params.post_status) {
  //     query.where("status").equals(params.post_status);
  //   }

  //   return await query.exec();
  // }
}

export const posts = new PostDao();
