import express, { Request, Response } from "express";
import { body, check, param } from "express-validator";
import jwt from "jsonwebtoken";
import { posts } from "../data/PostDao";
import { validateRequest } from "../middlewares/validate-request";
import { Post, PostStatus, PostType } from "../models/post";
import { SearchQuery } from "../models/search";
import { search } from "../data/SearchDao";
import { requireAuth } from "../middlewares/require-auth";
import { EmailUnsubscriptionPayload } from "../utils/email";
import { NotFoundError } from "../errors/not-found-error";
import { BadRequestError } from "../errors/bad-request-error";
import { requireDeveloper } from "../middlewares/require-developer";

const router = express.Router();

router.get(
  "/api/posts",
  validateRequest,
  async (req: Request, res: Response) => {
    const query = req.query as SearchQuery;
    const data = await search.list(query);
    res.send({ data });
  }
);

router.post(
  "/api/post",
  requireAuth,
  [
    // list of validators for request
    body("title")
      .trim()
      .isLength({ min: 4, max: 50 })
      .withMessage("title must be between 4 and 50 characters"),
    body("body")
      .trim()
      .isLength({ min: 4 })
      .withMessage("post body must be more than 4 characters"),
    body("post_type")
      .isIn(Object.values(PostType))
      .withMessage("type must be one of " + Object.values(PostType)),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, body, post_type, project } = req.body;
    const data = await posts.create({
      title,
      body,
      post_type,
      user: req.currentUser!.id,
      project: project,
    });
    // subscribe post creator automatically
    await posts.addToEmailList(data.id, req.currentUser!.email);
    res.send({ data, message: "post created successfully!" }).status(200);
  }
);

router.put(
  "/api/update",
  requireAuth,
  [
    // list of validators for request, update must follow existing validators
    body("title")
      .trim()
      .isLength({ min: 4, max: 50 })
      .withMessage("title must be between 4 and 50 characters"),
    body("body")
      .trim()
      .isLength({ min: 4 })
      .withMessage("post body must be more than 4 characters"),
    body("post_type")
      .isIn(Object.values(PostType))
      .withMessage("type must be one of " + Object.values(PostType)),
    body("list_of_upvotes")
      .isArray()
      .withMessage("list_of_upvotes must be an array"),
    body("project").isMongoId().withMessage("project must be valid id"),
  ],
  validateRequest,
  requireDeveloper,
  async (req: Request, res: Response) => {
    const {
      title,
      body,
      post_type,
      status,
      votes,
      postID,
      list_of_upvotes,
      project,
    } = req.body;
    await posts.update(postID, {
      title,
      body,
      post_type,
      status,
      votes,
      user: req.currentUser!.id,
      list_of_upvotes,
      project,
    });
    res.send({ message: "post updated successfully!" }).status(200);
  }
);

router.put(
  "/api/update/upvote",
  requireAuth,
  validateRequest,
  async (req: Request, res: Response) => {
    const { postID, email, cost } = req.body;
    await posts.incrementUpvote(postID, email, cost);
    res.send({ message: "post upvoted successfully!" }).status(200);
  }
);

router.get(
  "/api/posts/:postID/subscription-status",
  [param("postID").isMongoId().withMessage("postID must be valid id")],
  validateRequest,
  async (req: Request, res: Response) => {
    if (!req.currentUser) {
      res.send({ status: false });
    }
    const { postID } = req.params;
    const status = await posts.isUserSubscribed(postID, req.currentUser!.email);
    res.send({ status });
  }
);

router.post(
  "/api/posts/:postID/update-subscription",
  requireAuth,
  [
    param("postID").isMongoId().withMessage("postID must be valid id"),
    body("subscribe").isBoolean(),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { postID } = req.params;
    const { subscribe } = req.body;
    if (subscribe) {
      posts.addToEmailList(postID, req.currentUser!.email);
    } else {
      posts.removeFromEmailList(postID, req.currentUser!.email);
    }
    res.send({ status: subscribe });
  }
);

router.get(
  "/api/posts/unsubscribe/:token",
  async (req: Request, res: Response) => {
    const { token } = req.params;
    try {
      const payload = jwt.verify(
        token,
        process.env.JWT_KEY!
      ) as EmailUnsubscriptionPayload;
      posts.removeFromEmailList(payload.postID, payload.email);
    } catch (e) {
      throw new BadRequestError("Invalid token");
    }

    res.send("You have been unsubscribed from this post!").status(200);
  }
);

router.post(
  "/api/post/import/issues",
  requireAuth,
  [],
  validateRequest,
  async (req: Request, res: Response) => {
    const { listIssues, project, post_type } = req.body;
    let allPosts = [];
    for (const issue of listIssues) {
      const title = issue.title;
      let body = "No description provided.";
      if (issue.body !== null) {
        body = issue.body;
      }
      const data = await posts.create({
        title,
        body,
        post_type,
        user: req.currentUser!.id,
        project: project.id,
      });
      allPosts.push(data);
    }
    res.send({ allPosts, message: "posts created successfully!" }).status(200);
  }
);
/*
router.delete(
  "/api/post/deleteAll",
  validateRequest,
  async (req: Request, res: Response) => {
    const data = await Post.remove({});
    res.send({ data });
  }
);
*/

export { router as postRouter };
