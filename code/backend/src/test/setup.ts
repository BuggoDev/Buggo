import { MongoMemoryServer } from "mongodb-memory-server";
import AWS from "aws-sdk";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";
import { Comment } from "../models/comment";
import { Post, PostType } from "../models/post";
import { Project } from "../models/project";
import { User, UserDoc } from "../models/user";

let mongo: any;
jest.setTimeout(50000);

beforeAll(async () => {
  process.env.JWT_KEY = "test_jwt";
  process.env.JWT_EXPIRATION = "3600";
  process.env.AWS_ACCESS_KEY_ID = "test";
  process.env.AWS_SECRET_ACCESS_KEY = "test";
  process.env.AWS_SQS_URL = "test";
  process.env.GOOGLE_CLIENT_ID = "test";
  process.env.GOOGLE_CLIENT_SECRET = "test";
  process.env.GITHUB_CLIENT_ID = "test";
  process.env.GITHUB_CLIENT_SECRET = "test";
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();
  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

// global sign in method to make it easy to auth

declare global {
  var signin: () => Promise<{
    token: string;
    user: UserDoc;
  }>;
}

global.signin = async () => {
  const email = "test@test.com";
  const password = "password";
  const authResponse = await request(app)
    .post("/api/users/signup")
    .send({
      email,
      password,
    })
    .expect(200);
  return authResponse.body;
};

export const createUser = async () => {
  const user = User.build({
    email: "123@123.com",
    password: "1234567",
  });
  await user.save();
  return user;
};

export const createPost = async (
  user: mongoose.Schema.Types.ObjectId,
  project: mongoose.Schema.Types.ObjectId
) => {
  const post = Post.build({
    title: "new post",
    body: "body",
    post_type: PostType.BugReport,
    user,
    project,
  });
  await post.save();
  return post;
};

export const createComment = async (user: mongoose.Schema.Types.ObjectId) => {
  const comment = Comment.build({
    body: "my body",
    user,
  });
  await comment.save();
  return comment;
};

export const createProject = async (name: string, urlLogo: string) => {
  const project = Project.build({
    name: name,
    urlLogo: urlLogo,
  });
  await project.save();
  return project;
};
jest.mock("aws-sdk", () => {
  const SQSMocked = {
    sendMessage: jest.fn().mockReturnThis(),
    promise: jest.fn(),
  };
  return {
    SQS: jest.fn(() => SQSMocked),
    S3: jest.fn(() => {}),
    config: {
      update() {
        return {};
      },
    },
  };
});
