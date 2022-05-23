import MDEditor from "@uiw/react-md-editor";
import { useAppSelector } from "app/hooks";
import { FC } from "react";
import rehypeSanitize from "rehype-sanitize";
import { selectIsOnMobile } from "slices/userSlices";
import { postFormatting, infoFormatting, bodyFormatting } from "./PostContent";
import { postStatusStyling } from "./PostTypeAndStatus/PostStatusComponent";

const SampleStatus: FC = () => {
  const statusComponentFormat = `
    dropdown-toggle px-3 py-2.5
    bg-white rounded-xl border-slate-600 border-2
    text-black font-medium text-xs leading-tight uppercase
    transition duration-150 ease-in-out
    flex items-center
    whitespace-nowrap
  `;
  const sampleStatusText: string = "Post Status";

  return (
    <div className={postStatusStyling}>
      <div className={statusComponentFormat}>
        {sampleStatusText}
      </div>
    </div>
  )
}

const SampleType: FC = () => {
  const typeComponentFormat = `
    dropdown-toggle px-2 py-1
    bg-[#EB8134]/30 rounded-xl shadow-md
    text-[#EB8134] font-medium text-xs leading-tight uppercase
    transition duration-150 ease-in-out
    flex items-center whitespace-nowrap
  `
  const sampleTypeText: string = "Post Type";
  return (
    <div className="flex justify-center">
      <div className={typeComponentFormat}>
        {sampleTypeText}
      </div>
    </div>
  )
}

const FillerPost: FC = () => {
  const isOnMobile = useAppSelector(selectIsOnMobile)
  const headerFormatting: string = `${isOnMobile ? "flex flex-col" : "flex flex-row"}`;

  /* Post Information */
  const title: string = "Welcome to Buggo! This is what a post looks like.";
  const author: string = "Author's Email";
  const body: string = "This is where the post content would be. You can describe a bug that you've experienced with the website, or enumerate feature requests and suggestions for the developers.";

  const date = new Date(Date.now());
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.toLocaleString("default", { day: "numeric" });
  const year = date.toLocaleString("default", { year: "numeric" });

  return (
    <div>
      <div className={postFormatting}>
        {/* Header (Post Title, Post Status, Post Type) */}
        <div className={headerFormatting}>
          {/* Title */}
          <h2 className="font-semibold w-full text-3xl mb-5">{title}</h2>

          {/* Status */}
          <SampleStatus />
        </div>

        <div className={`${headerFormatting} pb-4`}>
          {/* Type */}
          <SampleType />
        </div>

        {/* User Info (Post User, Post Time) */}
        <div className={infoFormatting}>
          <div className="flex flex-row space-x-1">
            {/* Author */}
            <h6 className="inline-block break-all font-semibold text-[#99C2A2]">
              {author}
            </h6>
          </div>
          {/* Date */}
          <span className="text-sm text-gray-500">{` ${"on"} ${month} ${day}, ${year}`}</span>
        </div>

        {/* Post Body */}
        <div className={bodyFormatting} data-color-mode="light">
          <MDEditor.Markdown
            source={body}
            rehypePlugins={[[rehypeSanitize]]}
          />
        </div>

        {/* Footer */}
        <div className="flex flex-row-reverse w-full">
        </div>
      </div>
    </div>
  );
}

export default FillerPost;