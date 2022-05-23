import express from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import "express-async-errors";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import cors from "cors";
import { helloRouter } from "./routes/hello-world";
import { commentRouter } from "./routes/comment";
import { postRouter } from "./routes/post";
import { userRouter } from "./routes/user";
import { projectRouter } from "./routes/project";
import { currentUser } from "./middlewares/current-user";
import { oauthRouter } from "./routes/oauth";
import { githubStrategy, googleStategy } from "./services/oauth";
import { mediaRouter } from "./routes/media";
import { widgetRouter } from "./routes/widget";

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3000",
    "https://buggo.netlify.app",
    "http://127.0.0.1:5500",
    "https://buggo.org"
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: true,
  optionsSuccessStatus: 204,
  credentials: true,
};

passport.use(googleStategy);
passport.use(githubStrategy);
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user: any, done) {
  done(null, user);
});

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(currentUser);
app.use(oauthRouter);
app.use(helloRouter);
app.use(commentRouter);
app.use(postRouter);
app.use(userRouter);
app.use(projectRouter);
app.use(mediaRouter);
app.use(widgetRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };