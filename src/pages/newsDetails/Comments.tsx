import { BsEmojiFrown } from "react-icons/bs";
import { AuthContextType, CommentType, NewsType } from "../../helper/Type";
import { LuSend } from "react-icons/lu";
import { RiAttachment2, RiDeleteBin6Line } from "react-icons/ri";
import Picker from "emoji-picker-react";
import React, { ChangeEvent, useContext, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { uploadImage } from "../../api";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useAxios } from "../../hooks/axios/useAxios";
import useFetchSignleNew from "../../hooks/news/useFetchSignleNew";
import toast from "react-hot-toast";
import { AuthContext } from "../../contex/AuthProvider";
const Comments = ({
  payload,
  formatDate,
}: {
  payload: NewsType;
  formatDate: (dateString: string | undefined) => string;
}) => {
  const { user, loading } = useContext(
    AuthContext as React.Context<AuthContextType>
  );

  const [inputStr, setInputStr] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [commetImageUploadLoading, setCommentImageUpLoading] = useState(false);
  const onEmojiClick = (emojiObject: { emoji: string }): void => {
    setInputStr((prevInput) => prevInput + emojiObject.emoji);
    setShowPicker(false);
  };
  const handleFileSelect = () => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    fileInput.click();
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && isImage(file)) {
      setCommentImageUpLoading(true);
      const commentImageURL = await uploadImage(file);
      console.log(commentImageURL);
      setSelectedImage(commentImageURL);
      setCommentImageUpLoading(false);
    }
    event.target.value = "";
  };

  const isImage = (file: File): boolean => {
    return file.type.startsWith("image/");
  };

  const handleDeleteImage = () => {
    setSelectedImage(null);
  };

  // Comments Upload Proecess
  const newsId = payload?._id;
  const { axiosInstance } = useAxios();
  const { refetch } = useFetchSignleNew(newsId);
  // console.log(id);

  const handleUploadComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loading) {
      const commentBody = {
        name: user?.displayName,
        profileImage: user?.photoURL,
        commentImage: selectedImage,
        commentText: inputStr,
      };
      console.log(commentBody);
      const { data } = await axiosInstance.post(
        `/news-comments/${newsId}`,
        commentBody
      );
      console.log("serverData", data);
      setInputStr("");
      setSelectedImage(null);
      refetch();
      toast.success("Create a new comment");
    }
  };
  const handleDeleteComment = async (id: string) => {
    try {
      console.log(id);
      const { data } = await axiosInstance.delete(
        `/news-comments/${id}?newsId=${newsId}`
      );
      console.log(data);
      toast.success("Deleting this comment");
      refetch();
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Failed to delete comment❌");
    }
  };

  // console.log(commentBody);
  // console.log(selectedImage);
  // console.log(inputStr);
  return (
    <div>
      <div className="mt-3">
        <label
          htmlFor="comment"
          className="sm:text-[16px] text-[13px] dark:text-gray-300 text-gray-500 "
        >
          Write your comment
        </label>
        <form className=" sm:w-11/12 w-full " onSubmit={handleUploadComment}>
          <div className="relative ">
            <textarea
              value={inputStr}
              onChange={(e) => setInputStr(e.target.value)}
              className="sm:py-5 py-4 mt-3 resize-none bg-[#ecf0f1] px-3 sm:px-5  border-gray-300 border  dark:text-white dark:bg-gray-800 dark:border-gray-600  outline-none sm:text-sm text-xs rounded-md  w-full sm:h-40 h-40"
              placeholder="Write your comment"
            ></textarea>
            <div className="relative">
              <div className="absolute z-50 sm:bottom-16 bottom-14 sm:left-6 left-4">
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Selected Image"
                    className="w-12 h-12 rounded-md cursor-pointer"
                  />
                )}
                <div className="absolute top-0 right-0">
                  {selectedImage && (
                    <span
                      className="text-sm cursor-pointer"
                      onClick={handleDeleteImage}
                    >
                      <IoMdClose className="text-lg bg-white text-gray-600 rounded-sm p-[1px]" />
                    </span>
                  )}
                  {commetImageUploadLoading && (
                    <div className="absolute bottom-2 left-1">
                      <AiOutlineLoading3Quarters className="animate-spin text-xl" />
                    </div>
                  )}
                </div>
              </div>
            </div>

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
                    <RiAttachment2
                      className="sm:text-xl text-gray-500 dark:text-gray-300 cursor-pointer"
                      onClick={handleFileSelect}
                    />
                    <span className="text-sm" onClick={handleFileSelect}>
                      Attach
                    </span>

                    {/* Hidden file input element */}
                    <input
                      type="file"
                      id="fileInput"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
                {inputStr === "" ? (
                  <button disabled className="cursor-not-allowed">
                    <LuSend className="sm:text-xl   " />
                  </button>
                ) : (
                  <button>
                    <LuSend className="sm:text-xl  cursor-pointer" />
                  </button>
                )}
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
          <h1 className="flex-1  w-full">
            All Comments <span>{payload?.comments?.length}</span>
          </h1>
          {/* <span className="hidden sm:block">{payload?.comments?.length}</span> */}
          <div className=" w-full sm:w-10/12 h-[2px] dark:h-[1px] dark:bg-gray-700 bg-gray-300"></div>
        </div>

        <div className="mt-10 space-y-10">
          {payload?.comments?.map((comment: CommentType) => {
            return (
              <div className="flex gap-4 w-full" key={comment?._id}>
                {comment?.profileImage === null ? (
                  <div>
                    <div className="font-bold capitalize bg-blue-600 h-10 w-10 rounded-full text-sm flex justify-center items-center text-white">
                      {user?.displayName?.slice(0, 2)}
                    </div>
                  </div>
                ) : (
                  <div className="w-11 h-11 ">
                    <img
                      className="w-full h-full rounded-full cursor-pointer"
                      src={comment?.profileImage}
                      alt="profile"
                    />
                  </div>
                )}

                <div className="w-8/12">
                  <div className="flex gap-2">
                    <h1 className="sm:text-[16px]  dark:text-gray-300 text-gray-600 font-bold">
                      {comment?.name}
                    </h1>
                    {user?.displayName === comment?.name && (
                      <RiDeleteBin6Line
                        onClick={() => handleDeleteComment(comment?._id)}
                        className="dark:text-gray-300 text-gray-600 cursor-pointer font-bold"
                      />
                    )}
                  </div>
                  <h2 className="text-[10px] text-gray-600  text-left dark:text-gray-300">
                    {formatDate(comment?.createdAt)}
                  </h2>
                  {comment?.commentImage === null ? (
                    ""
                  ) : (
                    <div className="sm:w-6/12 w-full my-3 rounded-md ">
                      <img
                        className="w-full h-full rounded-md"
                        src={comment?.commentImage}
                        alt="Comment Image"
                      />
                    </div>
                  )}
                  <p className=" text-justify mt-2 text-[15px] dark:text-gray-300 text-gray-600 ">
                    {comment?.commentText}
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
