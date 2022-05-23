import { Project } from "../models/project";
import { User } from "../models/user";

export class ProjectDao {
  async create(name: string, urlLogo: string, email: string) {
    const project = Project.build({
      name: name,
      urlLogo: urlLogo,
    });
    await project.save();

    const existingUser = await User.findOne({ email });
    existingUser?.projects.push(project._id);
    await existingUser?.save();

    project.developers.push(existingUser?._id);
    await project.save();
    
    return {
      id: project._id.toString(),
      name: project.name,
      urlLogo: project.urlLogo,
    };
  }
}

export const projects = new ProjectDao();
