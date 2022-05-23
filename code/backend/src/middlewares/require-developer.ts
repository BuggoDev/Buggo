import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/not-authorized-error";
import { Project } from "../models/project";

export const requireDeveloper = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }
  const { project } = req.body;
  if (!project) {
    throw new NotAuthorizedError();
  }
  const projectDoc = await Project.findById(project);
  if (!projectDoc || !projectDoc.developers.includes(req.currentUser.id)) {
    throw new NotAuthorizedError();
  }
  next();
};
