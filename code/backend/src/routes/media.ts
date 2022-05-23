import express, { Request, Response } from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import { s3 } from "../services/aws";
import path from "path";
import cors from "cors";

const router = express.Router();

const upload = multer({
  storage: multerS3({
    s3,
    bucket: "buggo",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(
        null,
        "media/" + Date.now().toString() + path.extname(file.originalname)
      ); //use Date.now() for unique file keys
    },
  }),
});

router.post(
  "/api/media/upload",
  cors(),
  upload.single("file"),
  async (req: Request, res: Response) => {
    res
      .send({
        message: "media uploaded successfully!",
        data: { key: (req.file! as any).key },
      })
      .status(200);
  }
);

export { router as mediaRouter };
