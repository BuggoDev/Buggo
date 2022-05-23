import express, { Request, Response } from "express";
import { body, check, param } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";
import { Project } from "../models/project";
import { projects } from "../data/ProjectDao";
import { BadRequestError } from "../errors/bad-request-error";
import { User } from "../models/user";
import { parseJsonText } from "typescript";
import { requireAuth } from "../middlewares/require-auth";
import { NotAuthorizedError } from "../errors/not-authorized-error";
import { userService } from "../data/UserDao";

const router = express.Router();

router.post(
  "/api/project",
  [
    // list of validators for request
    body("name")
      .trim()
      .isLength({ min: 1, max: 50 })
      .withMessage("name must be between 1 and 50 characters"),
    body("email").isEmail().withMessage("Email must be valid"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name, urlLogo, email } = req.body;
    const data = await projects.create(name, urlLogo, email);
    res.send({ data, message: "project created successfully!" }).status(200);
  }
);

router.get(
  "/api/allProjects",
  validateRequest,
  async (req: Request, res: Response) => {
    const data = await Project.find({}).populate("developers");
    res.send({ data });
  }
);

router.get(
  "/api/project/:projectId",
  [param("projectId").isMongoId().withMessage("projectId must be valid id")],
  validateRequest,
  async (req: Request, res: Response) => {
    const { projectId } = req.params;
    const data = await Project.findById(projectId).populate("developers");
    res.send({ data });
  }
);

router.post(
  "/api/project/addDeveloper",
  requireAuth,
  [body("email").isEmail().withMessage("Email must be valid")],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email } = req.body;
    const { projectId } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError("User not found");
    }

    const project = await Project.findById(projectId);
    if (!project) {
      throw new BadRequestError("Project not found");
    }

    if (!project.developers.includes(req.currentUser!.id)) {
      throw new NotAuthorizedError();
    }

    if (project.developers.includes(existingUser.id)) {
      throw new BadRequestError("Cannot add duplicated email");
    }

    project.developers.push(existingUser.id);
    await project.save();

    const resBody = await userService.getProjects(req.currentUser!.id);
    res.status(200).send(resBody);
  }
);

export { router as projectRouter };
