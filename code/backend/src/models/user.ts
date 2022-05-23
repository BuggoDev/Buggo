import mongoose from "mongoose";
import { Password } from "../services/password";

/**
 * Declares the fields needed to create a new User
 * some fields in `UserDoc` do not need to be passed in
 */
export interface UserAttrs {
  email: string | null;
  password?: string;
  first_name?: string;
  last_name?: string;
  profile_url?: string;
  provider?: string;
  provider_id?: string;
  github_login?: string;
}

/**
 * Declares the fields in a created User document
 */
export interface UserDoc extends mongoose.Document {
  posts: mongoose.Schema.Types.ObjectId[]; //List of ids of their posts
  comments: mongoose.Schema.Types.ObjectId[]; //List of ids of their comments
  projects: mongoose.Schema.Types.ObjectId[]; //List of ids of their projects
  email: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  profile_url?: string;
  provider?: string;
  provider_id?: string;
  github_login?: string;
}

/**
 * Declares a build function used to enforce the use of UserAttrs
 * please use `User.build()` instead of `new User()`
 */
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    profile_url: {
      type: String,
    },
    provider: {
      type: String,
      default: "native",
    },
    provider_id: {
      type: String,
      default: "native",
    },
    github_login: {
      type: String,
      default: "native",
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
  },
  {
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id;
        ret.post_ids = ret.posts;
        ret.comment_ids = ret.comments;
        ret.github_login = ret.github_login;
        delete ret.posts;
        delete ret.comments;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        delete ret.id;
        delete ret.provider_id;
      },
    },
  }
);

/**
 * Pre save hook to hash user's password
 */
userSchema.pre("save", async function (done) {
  // only hash when pass modified
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  // enforces that all fields in PostAttrs are defined in input
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
