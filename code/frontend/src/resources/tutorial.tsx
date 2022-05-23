const baseTutorialConfig = {
  disableBeacon: true,
  spotlightPadding: 0,
}
export const tutorialSteps = [
  {
    content: <h2>Welcome to Buggo</h2>,
    placement: "center" as const,
    target: "body",
    ...baseTutorialConfig
  },
  {
    target: ".intro-addPost",
    content: "You can create a new post here!",
    ...baseTutorialConfig
  },
  {
    target: ".intro-postTitle",
    content: "You can add the title to your post here",
    ...baseTutorialConfig
    
  },
  {
    target: ".intro-postDescription",
    content: "You can add a markdown description to your post",
    ...baseTutorialConfig
  },
  {
    target: ".intro-postTag",
    content:
    "You can select the post category whether it is a bug report or a feature request.",
    ...baseTutorialConfig
  },
  {
    target: ".intro-postButton",
    content: "When you are ready, you can post and share it with everyone!",
    ...baseTutorialConfig
  },
];
