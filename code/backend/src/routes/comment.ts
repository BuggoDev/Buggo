import express, { Request, Response } from "express";
import { CommentDao } from "../data/CommentDao";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";
import { SearchQuery } from "../models/search";
import { Comment } from "../models/comment";
import { search } from "../data/SearchDao";
import { requireAuth } from "../middlewares/require-auth";

const router = express.Router();
const comments = new CommentDao();

/**
 * Adds new comment to collection
 */
router.post(
  "/api/comment",
  requireAuth,
  [
    body("body")
      .trim()
      .isLength({ min: 2 })
      .withMessage("comment body must be minimum of 4 characters"),
    body("postID").isMongoId().withMessage("postID must be valid id"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { postID, body } = req.body;
    const data = await comments.create(postID, body, req.currentUser!.id);
    res.status(200).send(data);
  }
);

router.get(
  "/api/comments/:id",
  validateRequest,
  async (req: Request, res: Response) => {
    const commentID = req.params.id;
    const data = await comments.find(commentID);
    res.send({ data });
  }
);

router.get(
  "/api/commentsAll",
  validateRequest,
  async (req: Request, res: Response) => {
    const query = req.query as SearchQuery;
    const allPosts = await search.list(query);
    const data = await comments.getCommentList(allPosts);
    res.send({ data });
  }
);

router.post(
  "/api/comment/github",
  requireAuth,
  validateRequest,
  async (req: Request, res: Response) => {
    const { postIDList, commentBodyLists, projectID } = req.body;
    await comments.createFromIssues(postIDList, commentBodyLists);
    const query = { project: projectID } as SearchQuery;
    const data = await search.list(query);
    res.status(200).send({data, message: "Successfully imported"});
  }
);

/*
router.delete(
  "/api/comment/deleteAll",
  validateRequest,
  async (req: Request, res: Response) => {
    const data = await Comment.remove({});
    res.send({ data });
  }
);
*/

export { router as commentRouter };
