import express, { Request, Response } from "express";
import { body } from "express-validator";
import { userService } from "../data/UserDao";
import { BadRequestError } from "../errors/bad-request-error";
import { requireAuth } from "../middlewares/require-auth";
import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/user";

const router = express.Router();

// endpoint to update user profile
router.patch(
  "/api/users/currentuser",
  requireAuth,
  [
    body("email").optional().isEmail().withMessage("Email must be valid"),
    body("first_name")
      .optional()
      .trim()
      .isLength({ min: 1, max: 20 })
      .withMessage("First Name must be between 4 and 20 characters"),
    body("last_name")
      .optional()
      .trim()
      .isLength({ min: 1, max: 20 })
      .withMessage("Last Name must be between 4 and 20 characters"),
    body("posts")
      .not()
      .exists()
      .withMessage("Does not allow modification of posts"),
    body("comments")
      .not()
      .exists()
      .withMessage("Does not allow modification of comments"),
    body("password")
      .not()
      .exists()
      .withMessage("Does not allow modification of password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser && existingUser.id !== req.currentUser!.id) {
      throw new BadRequestError("Email in use");
    }
    const user = await User.findByIdAndUpdate(req.currentUser!.id, req.body, {
      returnDocument: "after",
    });

    res.send({ currentUser: user });
  }
);

router.get("/api/users/currentuser", async (req, res) => {
  let user = null;
  if (req.currentUser) {
    user = await User.findById(req.currentUser.id);
  }

  res.send({ currentUser: user });
});

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await userService.createUser({ email, password });

    // generate jwt
    const userJwt = await userService.generateToken({
      id: user.id,
      email: user.email,
    });

    const resBody = {
      token: userJwt,
      user,
    };
    res.status(200).send(resBody);
  }
);

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // authenticate user with email and password
    const user = await userService.authenticate(email, password);

    // generate jwt
    const userJwt = await userService.generateToken({
      id: user.id,
      email: user.email,
    });
    const resBody = {
      token: userJwt,
      user,
    };
    res.status(200).send(resBody);
  }
);

router.get(
  "/api/user/projects",
  requireAuth,
  validateRequest,
  async (req: Request, res: Response) => {
    const resBody = await userService.getProjects(req.currentUser!.id);

    res.status(200).send(resBody);
  }
);

export { router as userRouter };
