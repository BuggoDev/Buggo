import { Post, PostType, PostStatus, PostDoc } from "../models/post";
import { Comment } from "../models/comment";
import { SearchQuery } from "../models/search";

// Strat: recurssively search through the list of words
// and return the first word that matches the search
// loop through all the posts
// for each post,
//   loop through all the comments
// if the comment contains the search word
//   add the post
//   for each comment,
//     loop through all the replies
//  return list of associate posts

// export interface SearchQuery {
//     limit?: number; // the number of posts to return
//     skip?: number; // the number of posts to skip
//     fields?: string; // space separated fields: title body ...
//     sort?: string; // sort by any field
//     post_type?: PostType;
//     post_status?: PostStatus;
//     user_input?: string;
//   }

class SearchDao {
  async list(params: SearchQuery) {
    let query;

    query = Post.find()
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      })
      .populate("user");
    if (params.fields) {
      query.select(params.fields);
    }
    if (params.sort) {
      query.sort(params.sort);
    }
    if (params.limit && params.skip) {
      query.limit(params.limit).skip(params.skip);
    }
    if (params.post_type) {
      query.where("post_type").equals(params.post_type);
    }
    if (params.post_status) {
      query.where("status").equals(params.post_status);
    }
    if (params.project) {
      query.where("project").equals(params.project)
    }

    const posts = await query.exec();

    // return early if user does not provide a search input
    if (!params.user_input) {
      return posts;
    }
    // check if the post exists
    const results: PostDoc[] = [];
    posts.forEach(async (post) => {
      // check post title/post body
      if (
        params.user_input &&
        (post.body.includes(params.user_input) ||
          post.title.includes(params.user_input))
      ) {
        results.push(post);
      } else {
        // check comments
        post.comments.forEach(async (comment) => {
          const comment_content = await Comment.findById(comment);
          if (comment_content) {
            if (
              params.user_input &&
              comment_content.body.includes(params.user_input)
            ) {
              results.push(post);
            } else {
              // check replies
              /*comment_content.replies.forEach(async (reply) => {
                const reply_content = await Reply.findById(reply);
                if (
                  reply_content &&
                  params.user_input &&
                  reply_content.body.includes(params.user_input)
                ) {
                  results.push(post);
                }
              });*/
            }
          }
        });
      }
    });
    return results;
  }
}

export const search = new SearchDao();
