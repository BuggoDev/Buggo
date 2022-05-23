import { PostType, PostStatus } from "./post";

export interface SearchQuery {
    limit?: number; // the number of posts to return
    skip?: number; // the number of posts to skip
    fields?: string; // space separated fields: title body ...
    sort?: string; // sort by any field
    post_type?: PostType;
    post_status?: PostStatus;
    user_input?: string;
    project?: string;
  }