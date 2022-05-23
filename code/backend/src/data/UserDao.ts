import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { BadRequestError } from "../errors/bad-request-error";
import { UserPayload } from "../middlewares/current-user";
import { Project } from "../models/project";
import { User, UserAttrs } from "../models/user";
import { Password } from "../services/password";

class UserDao {
  async createUser({ email, password }: UserAttrs) {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    const user = User.build({ email, password });
    await user.save();
    return user;
  }

  async authenticate(email: string, password: string) {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("No eixsting user with this email");
    }
    const passwordMatch = await Password.compare(
      existingUser.password!,
      password
    );
    if (!passwordMatch) {
      throw new BadRequestError("Wrong Password");
    }
    return existingUser;
  }

  /**
   * Generates a JWT token for a user
   * @param attrs payload to be included in JWT
   * @returns string as JWT
   */
  async generateToken(payload: UserPayload) {
    const userJwt = jwt.sign(payload, process.env.JWT_KEY!, {
      expiresIn: parseInt(process.env.JWT_EXPIRATION!),
    });
    return userJwt;
  }

  async getProjects(userId: mongoose.Schema.Types.ObjectId) {
    const projects = await Project.find({ developers: userId }).populate(
      "developers"
    );
    //let query = User.findOne({ email }).populate("projects");
    //const user = await query.exec();
    return projects;
  }
}

export const userService = new UserDao();
