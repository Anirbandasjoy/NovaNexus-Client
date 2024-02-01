import { BsEmojiFrown } from "react-icons/bs";
import { CommentType, NewsType } from "../../helper/Type";
import { LuSend } from "react-icons/lu";
import { RiAttachment2 } from "react-icons/ri";
import Picker from "emoji-picker-react";
import { useState } from "react";
const Comments = ({
  payload,
  formatDate,
}: {
  payload: NewsType;
  formatDate: (dateString: string | undefined) => string;
}) => {
  const [inputStr, setInputStr] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const onEmojiClick = (emojiObject: { emoji: string }): void => {
    setInputStr((prevInput) => prevInput + emojiObject.emoji);
    setShowPicker(false);
  };
  console.log(inputStr);
  return (
    <div>
      <div className="mt-3">
        <label
          htmlFor="comment"
          className="sm:text-[16px] text-[13px] dark:text-gray-300 text-gray-500 "
        >
          Write your comment
        </label>
        <form className=" sm:w-11/12 w-full ">
          <div className="relative ">
            <textarea
              value={inputStr}
              onChange={(e) => setInputStr(e.target.value)}
              className="sm:py-5 py-4 mt-3 resize-none bg-[#ecf0f1] px-3 sm:px-5  border-gray-300 border  dark:text-white dark:bg-gray-800 dark:border-gray-600  outline-none sm:text-sm text-xs rounded-md  w-full sm:h-40 h-32"
              placeholder="Write your comment"
            ></textarea>

            <div className="absolute bottom-5 sm:bottom-7 sm:w-full w-11/12 right-4 sm:right-5 dark:text-gray-300 text-gray-500">
              <div className="w-full  flex justify-between ">
                <div className="flex items-center gap-3 sm:ml-10">
                  <div
                    className="flex items-center space-x-1 cursor-pointer"
                    onClick={() => {
                      setShowPicker((val) => !val);
                      console.log("Picker Toggled");
                    }}
                  >
                    <BsEmojiFrown className="sm:text-xl text-gray-500 dark:text-gray-300 cursor-pointer" />
                    <span className="text-sm">Emoji</span>
                  </div>

                  <div className="flex items-center space-x-1 cursor-pointer">
                    <RiAttachment2 className="sm:text-xl text-gray-500 dark:text-gray-300 cursor-pointer" />
                    <span className="text-sm">Attach</span>
                  </div>
                </div>
                <button>
                  <LuSend className="sm:text-xl  cursor-pointer" />
                </button>
              </div>
            </div>
            <div className="absolute  left-0-0">
              {showPicker && <Picker onEmojiClick={onEmojiClick} />}
            </div>
          </div>
        </form>
      </div>

      <div>
        <div className="sm:text-[16px] w-full sm:w-11/12 flex flex-col sm:flex-row gap-2 sm:gap-0 items-center mt-3 text-[13px] dark:text-gray-300 text-gray-500">
          <h1 className="flex-1  w-full">All Comments</h1>
          <div className=" w-full sm:w-10/12 h-[2px] dark:h-[1px] dark:bg-gray-700 bg-gray-300"></div>
        </div>

        <div className="mt-10 space-y-10">
          {payload?.comments?.map((comment: CommentType) => {
            return (
              <div className="flex gap-4 w-full" key={comment?._id}>
                <div className="w-11 h-11 ">
                  <img
                    className="w-full h-full rounded-full cursor-pointer"
                    src={comment?.profileImage}
                    alt="profile"
                  />
                </div>

                <div className="w-8/12">
                  <h1 className="sm:text-[16px]  dark:text-gray-300 text-gray-600 font-bold">
                    {comment?.name}
                  </h1>
                  <h2 className="text-[10px] text-gray-600  text-left dark:text-gray-300">
                    {formatDate(comment?.createdAt)}
                  </h2>
                  <p className=" text-justify mt-2 text-[15px] dark:text-gray-300 text-gray-600 ">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Deserunt in ipsa expedita assumenda praesentium vel illum
                    neque quidem libero cupiditate saepe, mollitia obcaecati,
                    tenetur tempora quaerat exercitationem recusandae sapiente
                    quae!
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Comments;
