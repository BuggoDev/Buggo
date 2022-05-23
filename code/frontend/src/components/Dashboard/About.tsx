import { FC } from "react";

const About: FC<{}> = () => {

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h2 className="text-xs text-green-500 tracking-widest font-medium title-font mb-1">
            SQUISHING BUGS AND MAKING IMPROVEMENTS
          </h2>
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            A Crossroads for Developers and Commonfolk
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Whether you are a developer that needs to keep tracks of tasks for a project
            or a user that wants to share their thoughts on a web app. We are here to
            bring everyone together.
          </p>
        </div>
        <div className="flex flex-wrap">
          <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
            <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
              Make a Post
            </h2>
            <p className="leading-relaxed text-base mb-4">
              Create a new post for a person&#39;s project. Other developers and users will
              be able to see and react accordingly.
            </p>
          </div>
          <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
            <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
              Make a Comment
            </h2>
            <p className="leading-relaxed text-base mb-4">
              Have a discussion with developers and other users about the webapp.
              Give feedback to bugs and requests by commenting on someone&#39;s post 
            </p>
          </div>
          <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
            <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
              Import your Github Issues
            </h2>
            <p className="leading-relaxed text-base mb-4">
              We get it. Your webapp is already using github issues. We made it easy
              for you to continue with that and add it all to Buggo.
            </p>
          </div>
          <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
            <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
              Subscribe to Posts
            </h2>
            <p className="leading-relaxed text-base mb-4">
              Subscribe to a post to get updates on progress from the post.
              Whether it&#39;s about people commenting on your post to getting
              updates on the progress of the bug or request.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
