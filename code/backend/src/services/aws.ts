import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.AWS_ACCESS_KEY_ID) {
  throw new Error("AWS_ACCESS_KEY_ID not defined");
}
if (!process.env.AWS_SECRET_ACCESS_KEY) {
  throw new Error("AWS_SECRET_ACCESS_KEY not defined");
}
if (!process.env.AWS_SQS_URL) {
  throw new Error("AWS_SQS_URL not defined");
}

AWS.config.update({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const s3 = new AWS.S3();

const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

export const sendEmail = (
  to: string[],
  from: string,
  subject: string,
  body: string,
  postID: any
) => {
  const emailData = {
    to,
    from,
    body,
    subject,
    postID,
  };
  sqs.sendMessage(
    {
      MessageBody: JSON.stringify(emailData),
      QueueUrl: process.env.AWS_SQS_URL!,
    },
    (err, data) => {
      if (err) {
        console.log("error", err);
      } else {
        console.log("email queued: ", data.MessageId);
      }
    }
  );
};
