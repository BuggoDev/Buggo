import { BadRequestError } from "@jwmodules/common";
import axios from "axios";
import express from "express";
import passport from "passport";
import { userService } from "../data/UserDao";
import { UserDoc } from "../models/user";

const router = express.Router();

router.post("/api/auth/github-token", async (req, res) => {
  const body = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code: req.body.code,
  };
  const { data } = await axios.post(
    `https://github.com/login/oauth/access_token`,
    body,
    { headers: { accept: "application/json" } }
  );
  res.send(data);
});

router.post(
  "/api/auth/github",
  passport.authenticate("github-token", { session: false }),
  async (req, res) => {
    if (!req.user) {
      throw new BadRequestError("failed to authenticate with GitHub");
    }
    const user = req.user as UserDoc;
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
  "/api/auth/google",
  passport.authenticate("google-oauth-token", {
    session: false,
  }),
  async (req, res) => {
    if (!req.user) {
      throw new BadRequestError("failed to authenticate with Google");
    }
    const user = req.user as UserDoc;
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

export { router as oauthRouter };
