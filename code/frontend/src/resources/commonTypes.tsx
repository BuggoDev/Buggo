/*
  File containing all of the common types we use throughout the app.
*/

// Types associated with an Account
export type Account = {
  email: string | null;
  post_ids: string[];
  comment_ids: string[];
  project_ids: string[];
  first_name?: string;
  last_name?: string;
  profile_url?: string;
  provider?: string;
  github_login?: string;
};

// Types associated with a Reply
export type Reply = {
  id: number;
  body: string;
  post_time: Date;
  user: string;
};

// Types associated with a Comment
export type Comment = {
  body: string;
  user: Account | null;
  votes: number;
  post_time: Date;
  id: string;
};

// Types associated with a PostStatus
export enum PostStatus {
  Reported = "Reported",
  InProgress = "In Progress",
  Resolved = "Resolved",
}

// Types associated with a PostType
export enum PostType {
  BugReport = "Bug Report",
  FeatureRequest = "Feature Request",
}

// Types associated with a Post
export type Post = {
  id: string;
  votes: number;
  user: Account | null;
  comments: Comment[];
  list_of_upvotes: string[];
  title: string;
  body: string;
  post_type: PostType;
  status: PostStatus;
  post_time: Date;
  project: string;
  post_number: number;
};

export type Project = {
  id: string;
  name: string;
  urlLogo: string | null;
  developers: Account[];
};
