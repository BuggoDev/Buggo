import mongoose from "mongoose";

/**
 * Declares the fields needed to create a new Post
 * some fields in `PostDoc` do not need to be passed in
 */
export interface ProjectAttrs {
  name: string;
  urlLogo: string | null;
}

/**
 * Declares the fields needed to update an existing Post
 * Some fields that cannot be modified are not passed in
 */
export interface UpdateProjectAttrs {
  name: string;
  urlLogo: string | null;
}

/**
 * Declares the fields in a created Post document
 */
export interface ProjectDoc extends mongoose.Document {
  name: string;
  developers:  mongoose.Schema.Types.ObjectId[];
  urlLogo: string | null;
}

/**
 * Declares a build function used to enforce the use of PostAttrs
 * please use `Post.build()` instead of `new Post()`
 */
interface ProjectModel extends mongoose.Model<ProjectDoc> {
  build(attrs: ProjectAttrs): ProjectDoc;
}

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    developers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    urlLogo: {
      type: String,
    },
  },
  {
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

projectSchema.statics.build = (attrs: ProjectAttrs) => {
  // enforces that all fields in PostAttrs are defined in input
  return new Project(attrs);
};

const Project = mongoose.model<ProjectDoc, ProjectModel>(
  "Project",
  projectSchema
);

export { Project };
