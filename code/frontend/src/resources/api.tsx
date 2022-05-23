import { store } from "app/store";
import axios, { AxiosInstance } from "axios";
import { resetUser } from "slices/userSlices";
import { PostType, PostStatus, Project } from "./commonTypes";
import { deleteCookie, getCookie } from "./utils";

export const apiUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4567"
    : "https://buggo-api.herokuapp.com";

/**
 * api class to define all data fetching logic
 */
class BackendApi {
  axiosClient: AxiosInstance;

  constructor() {
    this.axiosClient = axios.create({
      baseURL: apiUrl,
    });

    // attach token to every request
    this.axiosClient.interceptors.request.use(function (config) {
      const token = getCookie("token");
      if (token) {
        config.headers!.Authorization = "Bearer " + token;
      }
      return config;
    });

    // log user out because token has expired
    this.axiosClient.interceptors.response.use(
      (response) => response,
      (error) => {
        const { status } = error.response;
        if (status === 401) {
          deleteCookie("token");
          store.dispatch(resetUser());
        }

        return Promise.reject(error);
      }
    );
  }

  async fetchPosts(projectID: string) {
    const res = await this.axiosClient.get(`/api/posts?project=${projectID}`);
    return res;
  }

  async signup(password: string, email: string) {
    const res = await this.axiosClient.post("/api/users/signup", {
      email,
      password,
    });
    return res;
  }

  async signin(password: string, email: string) {
    const res = await this.axiosClient.post("/api/users/signin", {
      email,
      password,
    });
    return res;
  }

  async googleSignin(googleToken: string) {
    const res = await this.axiosClient.post("/api/auth/google", {
      access_token: googleToken,
    });
    return res;
  }

  async githubSignin(githubToken: object) {
    const res = await this.axiosClient.post("/api/auth/github?", githubToken);
    return res;
  }

  async githubGetToken(githubCode: string) {
    const res = await this.axiosClient.post("/api/auth/github-token", {
      code: githubCode,
    });
    return res;
  }

  async signout() {
    await this.axiosClient.get("/api/users/signout");
  }
  async fetchComment(commentID: string) {
    const res = await this.axiosClient.get("/api/comments/" + commentID);
    return res;
  }
  async fetchAllComments() {
    const res = await this.axiosClient.get("/api/commentsAll");
    return res;
  }

  async createPost(
    title: string,
    body: string,
    post_type: PostType,
    project: string
  ) {
    const res = await this.axiosClient.post("/api/post", {
      title,
      body,
      post_type,
      project,
    });
    return res;
  }

  async createComment(body: string, postID: string) {
    return await this.axiosClient.post("/api/comment", {
      body,
      postID,
    });
  }

  async updatePost(
    title: string,
    body: string,
    post_type: PostType,
    status: PostStatus,
    votes: number,
    postID: string,
    list_of_upvotes: string[],
    project: string
  ) {
    await this.axiosClient.put("/api/update", {
      title,
      body,
      post_type,
      status,
      votes,
      postID,
      list_of_upvotes,
      project,
    });
  }

  async incrementOne(postID: string, email: string, cost: number) {
    await this.axiosClient.put("/api/update/upvote", {
      postID,
      email,
      cost,
    });
  }

  async getUser() {
    const res = await this.axiosClient.get("/api/users/currentuser");
    return res;
  }

  async updateUserProfile(
    first_name: string,
    last_name: string,
    email: string
  ) {
    const res = await this.axiosClient.patch("/api/users/currentuser", {
      first_name,
      last_name,
      email,
    });
    return res;
  }

  async getSubscriptionStatus(postID: string) {
    const res = await this.axiosClient.get(
      `/api/posts/${postID}/subscription-status`
    );
    return res;
  }

  async updateSubscriptionStatus(postID: string, subscribe: boolean) {
    const res = await this.axiosClient.post(
      `/api/posts/${postID}/update-subscription`,
      {
        subscribe,
      }
    );
    return res;
  }
  async getAllProjects() {
    const res = await this.axiosClient.get("/api/allProjects");
    return res;
  }

  async getProject(projectId: string) {
    const res = await this.axiosClient.get(`/api/project/${projectId}`);
    return res;
  }

  async createProject(name: string, urlLogo: string, email: string) {
    return await this.axiosClient.post("/api/project", {
      name,
      urlLogo,
      email,
    });
  }

  async addDeveloper(email: string, projectId: string) {
    return await this.axiosClient.post("/api/project/addDeveloper", {
      email,
      projectId,
    });
  }

  async getAllUserProjects() {
    return await this.axiosClient.get("/api/user/projects");
  }

  async importIssues(listIssues: any[], project: Project, post_type: PostType) {
    const res = await this.axiosClient.post("/api/post/import/issues", {
      listIssues,
      project,
      post_type,
    });
    return res;
  }

  async importComments(
    postIDList: any[],
    commentBodyLists: any[][],
    projectID: string
  ) {
    const res = await this.axiosClient.post("/api/comment/github", {
      postIDList,
      commentBodyLists,
      projectID,
    });
    return res;
  }

  async uploadMedia(formData: FormData) {
    return await this.axiosClient.post("/api/media/upload", formData);
  }
}

export const api = new BackendApi();
