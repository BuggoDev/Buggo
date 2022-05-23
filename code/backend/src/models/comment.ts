import mongoose from "mongoose";
import { UserDoc } from "./user";

/**
 * Declares the fields needed to create a new Comment
 * some fields in `CommentDoc` do not need to be passed in
 */
interface CommentAttrs {
  body: string;
  user: mongoose.Schema.Types.ObjectId;
}

/**
 * Declares the fields in a created Comment document
 */
export interface CommentDoc extends mongoose.Document {
  body: string;
  user: mongoose.Schema.Types.ObjectId;
  votes: number;
  post_time: Date;
}

/**
 * Declares a build function used to enforce the use of CommentAttrs
 * please use `Comment.build()` instead of `new Comment()`
 */
interface CommentModel extends mongoose.Model<CommentDoc> {
  build(attrs: CommentAttrs): CommentDoc;
}

const commentSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    votes: {
      type: Number,
      required: true,
      default: 0,
    },
    post_time: {
      type: mongoose.Schema.Types.Date,
      required: true,
      default: Date.now(), //date time in UTC
    },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reply",
      },
    ],
  },
  {
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

commentSchema.statics.build = (attrs: CommentAttrs) => {
  // enforces that all fields in PostAttrs are defined in input
  // check that the fields are all correct
  return new Comment(attrs);
};

const Comment = mongoose.model<CommentDoc, CommentModel>(
  "Comment",
  commentSchema
);

export { Comment };
