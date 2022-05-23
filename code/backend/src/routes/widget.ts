import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";
import { Post, PostType } from "../models/post";
import cors from "cors";

const router = express.Router();
router.use(cors());

router.post(
  "/api/widget/post",
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
    body("project").isMongoId().withMessage("project must be valid id"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, body, post_type, project } = req.body;

    const post = new Post({
      title,
      body,
      post_type,
      project,
    });
    await post.save();
    res
      .send({ post, message: "widget post created successfully!" })
      .status(200);
  }
);

export { router as widgetRouter };
