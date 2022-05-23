import GoogleOauthTokenStrategy from "passport-google-oauth-token";
import { User } from "../models/user";
// @ts-ignore package doesn't have type definitions
import GitHubTokenStrategy from "passport-github-token";

export const githubStrategy = new GitHubTokenStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    passReqToCallback: true,
  },
  async (
    req: any,
    accessToken: any,
    refreshToken: any,
    profile: any,
    done: any
  ) => {
    try {
      const existingGithubUser = await User.findOne({
        provider_id: profile.id,
        provider: "github",
      });
      if (!existingGithubUser) {
        let userEmail = profile.emails;
        if (!userEmail) {
          userEmail = null;
        } else {
          userEmail = userEmail[0].value;
        }
        const newUser = User.build({
          first_name: profile.name!.givenName,
          last_name: profile.name!.familyName,
          email: userEmail,
          profile_url: profile._json.avatar_url,
          provider: "github",
          provider_id: profile.id,
        });
        await newUser.save();
        return done(null, newUser);
      }
      return done(null, existingGithubUser);
    } catch (err) {
      throw new Error(err as any);
    }
  }
);

export const googleStategy = new GoogleOauthTokenStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const existingGoogleUser = await User.findOne({
        provider_id: profile.id,
        provider: "google",
      });
      if (!existingGoogleUser) {
        const existingEmailUser = await User.findOne({
          email: profile.emails[0].value,
        });
        if (!existingEmailUser) {
          const newUser = User.build({
            first_name: profile.name!.givenName,
            last_name: profile.name!.familyName,
            email: profile.emails[0].value,
            profile_url: profile.photos[0].value,
            provider: "google",
            provider_id: profile.id,
          });
          await newUser.save();
          return done(null, newUser);
        }
        return done(null, existingEmailUser);
      }
      return done(null, existingGoogleUser);
    } catch (err) {
      throw new Error(err as any);
    }
  }
);
