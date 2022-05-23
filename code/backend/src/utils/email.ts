import mongoose from "mongoose";

export const statusUpdateEmailTemplate = (title: string, status: string) =>
  generateEmail([`This post is now <b>${status}</b>`]);

export const commentEmailTemplate = (title: string) =>
  generateEmail([`The post ${title} has a new comment!`]);

const generateEmail = (content: string[]) => `
<meta name="viewport" content="width=device-width, initial-scale=1" />
<body
  style="
    margin: 0px;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  "
>
  <div
    style="
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      background-color: #dddddd;
    "
  >
    <div style="width: 100%; max-width: 512px; padding: 32px">
      <div
        style="
          width: 100%;
          background-color: #ffffff;
          gap: 8px;
        "
      >
        <div style="height: 48px; padding: 16px; background-color: #99c2a2">
          <a href="https://buggo.netlify.app/">
            <img src="https://d3so69cp62ckrh.cloudfront.net/logos/logo.png" style="height: 48px" />
          </a>
        </div>
        
          ${content.map(
            (x) =>
              `<div style="padding: 8px 16px; font: helvetica; line-height: 1.5"><p>${x}</p></div>`
          )}
   
        <div
          style="
            line-height: 1.5;
            color: #777777;
            font-size: 11px;
            padding: 16px;
            background-color: #eeeeee;
          "
        >
          © 2022 Buggo Inc, 13400 Charles St, Baltimore, MD 21218. Buggo and the
          Buggo logo are registered trademarks of Buggo.
          <div>
            Visit our website <a href="https://buggo.netlify.app/">here</a>
          </div>
          <div>
          <a href="UNSUB_PLACEHOLDER">Click to unsubscribe</a>
        </div>
        </div>
      </div>
    </div>
  </div>
</body>
`;

export interface EmailUnsubscriptionPayload {
  email: string;
  postID: mongoose.Schema.Types.ObjectId;
}
