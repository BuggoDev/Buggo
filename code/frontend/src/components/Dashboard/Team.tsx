import { FC } from "react";
import Jacky from "../../resources/photos/Jacky.jpeg";
import Chinat from "../../resources/photos/Chinat.png";
import Elva from "../../resources/photos/Elva.jpeg";
import Karen from "../../resources/photos/Karen.jpeg";
import Will from "../../resources/photos/Will.jpeg";
import Mark from "../../resources/photos/Mark.jpeg";

const Team: FC<{}> = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Our Team
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            We are the trailblazers. The originators. If it existed we were there.
          </p>
        </div>
        <div className="flex flex-wrap -m-2">
          <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
            <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
              <img
                alt="team"
                className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                src={Mark}
              />
              <div className="flex-grow">
                <h2 className="text-gray-900 title-font font-medium">
                  Mark Tiavises
                </h2>
              </div>
            </div>
          </div>
          <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
            <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
              <img
                alt="team"
                className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                src={Karen}
              />
              <div className="flex-grow">
                <h2 className="text-gray-900 title-font font-medium">
                  Karen He
                </h2>
              </div>
            </div>
          </div>
          <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
            <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
              <img
                alt="team"
                className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                src={Will}
              />
              <div className="flex-grow">
                <h2 className="text-gray-900 title-font font-medium">
                  Will Tong
                </h2>
              </div>
            </div>
          </div>
          <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
            <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
              <img
                alt="team"
                className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                src={Chinat}
              />
              <div className="flex-grow">
                <h2 className="text-gray-900 title-font font-medium">
                  Chinat Yu
                </h2>
              </div>
            </div>
          </div>
          <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
            <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
              <img
                alt="team"
                className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                src={Elva}
              />
              <div className="flex-grow">
                <h2 className="text-gray-900 title-font font-medium">
                  Elva Shang
                </h2>
              </div>
            </div>
          </div>
          <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
            <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
              <img
                alt="team"
                className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                src={Jacky}
              />
              <div className="flex-grow">
                <h2 className="text-gray-900 title-font font-medium">
                  Jacky Wang
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
