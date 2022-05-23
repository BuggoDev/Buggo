import mongoose from "mongoose";
import { sendEmail } from "../services/aws";
import {
  commentEmailTemplate,
  statusUpdateEmailTemplate,
} from "../utils/email";

/**
 * Status of bug report/feature request
 */
export enum PostStatus {
  Reported = "Reported",
  InProgress = "In Progress",
  Resolved = "Resolved",
}

/**
 * Determine type of a post
 */
export enum PostType {
  BugReport = "Bug Report",
  FeatureRequest = "Feature Request",
}

/**
 * Declares the fields needed to create a new Post
 * some fields in `PostDoc` do not need to be passed in
 */
export interface PostAttrs {
  title: string;
  body: string;
  post_type: PostType; // bug report or feature request
  user: mongoose.Schema.Types.ObjectId;
  project: mongoose.Schema.Types.ObjectId;
}

/**
 * Declares the fields needed to update an existing Post
 * Some fields that cannot be modified are not passed in
 */
export interface UpdatePostAttrs {
  title: string;
  body: string;
  post_type: PostType;
  status: PostStatus;
  votes: number;
  list_of_upvotes: string[];
  user: mongoose.Schema.Types.ObjectId;
  project: mongoose.Schema.Types.ObjectId;
}

/**
 * Declares the fields in a created Post document
 */
export interface PostDoc extends mongoose.Document {
  title: string;
  body: string;
  votes: number;
  post_type: PostType;
  status: PostStatus;
  post_time: Date;
  user: mongoose.Schema.Types.ObjectId;
  list_of_upvotes: string[];
  comments: mongoose.Schema.Types.ObjectId[];
  subscribed_emails: string[];
  project: mongoose.Schema.Types.ObjectId;
}

/**
 * Declares a build function used to enforce the use of PostAttrs
 * please use `Post.build()` instead of `new Post()`
 */
interface PostModel extends mongoose.Model<PostDoc> {
  build(attrs: PostAttrs): PostDoc;
}

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // many-to-one two-sided,
    },
    votes: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      enum: Object.values(PostStatus),
      required: true,
      default: PostStatus.Reported,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    post_type: {
      type: String,
      enum: Object.values(PostType),
      required: true,
    },
    post_time: {
      type: mongoose.Schema.Types.Date,
      required: true,
      default: Date.now(), //date time in UTC
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    list_of_upvotes: [
      {
        type: String,
      },
    ],
    subscribed_emails: [
      {
        type: String,
      },
    ],
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    post_number: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.subscribed_emails;
      },
    },
  }
);

postSchema.statics.build = (attrs: PostAttrs) => {
  // enforces that all fields in PostAttrs are defined in input
  return new Post(attrs);
};

postSchema.pre("save", async function (next) {
  if (this.isNew) {
    const docCount = await this.constructor.countDocuments({
      project: this.project,
    });
    this.post_number = docCount + 1;
  }
  if (this.subscribed_emails.length > 0) {
    next();
  }
  if (this.isModified("status")) {
    sendEmail(
      this.subscribed_emails,
      "buggodev@gmail.com",
      `"${this.title}" is now ${this.status}!`,
      statusUpdateEmailTemplate(this.title, this.status),
      this._id
    );
  }
  if (this.isModified("comments")) {
    sendEmail(
      this.subscribed_emails,
      "buggodev@gmail.com",
      `"${this.title}" has a new comment!`,
      commentEmailTemplate(this.title),
      this._id
    );
  }

  next();
});

const Post = mongoose.model<PostDoc, PostModel>("Post", postSchema);

export { Post };
