import express, { Request, Response } from "express";

const router = express.Router();

router.get("/api/hello", async (req: Request, res: Response) => {
  res.status(200).send({
    data: "hello",
  });
});

export { router as helloRouter };
