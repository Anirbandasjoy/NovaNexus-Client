import { AuthContext } from "@/contex/AuthProvider";
import { AuthContextType, NewsType } from "@/helper/Type";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import * as yup from "yup";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateProfile } from "firebase/auth";
import { uploadImage } from "@/api";
import { useAxios } from "@/hooks/axios/useAxios";
import useGetSingleUserProfile from "@/hooks/userProfile/useGetSingleUserProfile";
import { useNavigate, useParams } from "react-router-dom";
import NewsCard from "../home/middle/NewsCard";

import useFetchNews from "@/hooks/news/useFetchNews";

type EditeProfileType = {
  name: string;
};
const profileEditSchema = yup.object({
  name: yup.string().required(),
});
const Profile = () => {
  const { user } = useContext(AuthContext as React.Context<AuthContextType>);
  const { axiosInstance } = useAxios();
  const { email } = useParams();
  const { newsData } = useFetchNews();
  const navigate = useNavigate();
  const { sigleUserProfile, refetch } = useGetSingleUserProfile(email);
  const singleUserInfo = sigleUserProfile?.payload;
  const [profilePic, setProfilePic] = useState<string | null | undefined>(
    user?.photoURL
  );
  const [backgroundPhoto, setBackgroundPhoto] = useState<
    string | null | undefined
  >(singleUserInfo?.backgroundImage);
  const [profileUploadLoading, setProfileUploadLoading] =
    useState<boolean>(false);
  const [profileEditLoading, setProfileEditLoading] = useState<boolean>(false);
  const [backgroundPhotoLoading, setBackgroundPhotoLoading] =
    useState<boolean>(false);
  const [filteredNews, setFilteredNews] = useState<NewsType[]>([]);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(profileEditSchema) });
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        setProfileUploadLoading(true);
        const profileImageURL = await uploadImage(file);
        setProfilePic(profileImageURL);
        setProfileUploadLoading(false);
      } catch (error) {
        console.log(error);
        setProfileUploadLoading(false);
      }
    }
  };

  const handleBackgroundPhoto = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        setBackgroundPhotoLoading(true);
        const backgroudImageUrl = await uploadImage(file);
        setBackgroundPhoto(backgroudImageUrl);
        setBackgroundPhotoLoading(false);
      } catch (error) {
        console.log(error);
        setBackgroundPhotoLoading(false);
      }
    }
  };

  const onSubmit = async (data: EditeProfileType) => {
    try {
      if (user) {
        setProfileEditLoading(true);
        await updateProfile(user, {
          displayName: data.name,
          photoURL: profilePic,
        });

        const { data: updatedUserData } = await axiosInstance.put(
          `/profile/update/${user.email}`,
          {
            fullName: data?.name,
            profileImage: profilePic,
            backgroundImage: backgroundPhoto,
          }
        );
        console.log(updatedUserData);
      }
      setProfileEditLoading(false);
      reset();
      refetch();
    } catch (error) {
      setProfileEditLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const filterData = newsData?.payload?.filter(
      (news: NewsType) => news?.profileId?.email === email
    );

    setFilteredNews(filterData);
  }, [email, newsData?.payload]);

  return (
    <div className="flex gap-5 flex-col sm:flex-row">
      <div className="w-full ">
        <div className="sm:mt-2 mt-4 relative gap-5 w-full h-[19rem] lg:h-[28rem]">
          <div className="dark:bg-gray-700 bg-gray-100 h-full  w-full rounded-md">
            {singleUserInfo?.backgroundImage && (
              <div className="w-full  h-full rounded-md bg-auto">
                <img
                  className="w-full h-full object-cover"
                  src={singleUserInfo?.backgroundImage}
                  alt=""
                />
              </div>
            )}
          </div>
          <div className="sm:w-6/12 w-[14rem]  rounded-full sm:rounded-full lg:left-5 left-3 lg:-bottom-20 -bottom-14 absolute   py-10   bg-white dark:bg-gray-800 lg:h-[17rem] h-[14rem]  lg:w-[17rem]  shadow-sm flex justify-center lg:ring-8 ring-4 ring-purple-400 ring-offset-4 ring-offset-slate-50 dark:ring-offset-slate-900 ">
            <div className="lg:mt-2 mt-0">
              <div className="lg:w-20  lg:h-20 w-14 h-14 mx-auto ring-offset-2 ring-4 rounded-full ">
                {singleUserInfo?.profileImage ? (
                  <img
                    className="w-full  h-full rounded-full  bg-contain"
                    src={singleUserInfo?.profileImage}
                    alt=""
                  />
                ) : (
                  <div className="font-bold capitalize bg-blue-600 sm:h-fullsm:w-full h-full w-full rounded-full lg:text-xl text-sm  flex justify-center items-center text-white">
                    {singleUserInfo && singleUserInfo?.fullName?.slice(0, 2)}
                  </div>
                )}
              </div>
              <div className="mt-3 text-center">
                <h1 className="lg:text-xl text-lg font-extrabold text-purple-400">
                  {singleUserInfo?.fullName}
                </h1>
                <h2 className="font-bold lg:text-[15px] text-sm text-[#736980]">
                  {singleUserInfo?.email}
                </h2>

                {/* Edit Button modal code start */}
                <div className="mt-2">
                  <AlertDialog>
                    {user?.email === singleUserInfo?.email ? (
                      <AlertDialogTrigger>
                        <button className="lg:text-sm text-xs text-white font-bold rounded-sm textw bg-red-500 px-3 py-2">
                          Edit Profile
                        </button>
                      </AlertDialogTrigger>
                    ) : (
                      <button
                        onClick={() => navigate(-1)}
                        className="text-sm text-white font-bold rounded-sm textw bg-green-500 px-3 py-2"
                      >
                        Go Back
                      </button>
                    )}
                    <AlertDialogContent>
                      <form
                        className="space-y-3"
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <h1 className="text-xl w-9/12 mx-auto font-semibold text-gray-500 dark:text-gray-400">
                          Edit Your Profile
                        </h1>
                        <div className="flex flex-col gap-1 w-9/12 mx-auto">
                          <label htmlFor="fullName " className="text-sm">
                            Full Name
                          </label>
                          <input
                            {...register("name")}
                            defaultValue={user?.displayName || ""}
                            type="text"
                            className="py-3 bg-[#ecf0f1] px-3  border-gray-300 border dark:text-white dark:bg-gray-800  dark:border-gray-600  outline-none text-sm rounded-md"
                          />

                          <p className="text-red-500 text-xs dark:text-red-400 font-semibold">
                            {" "}
                            {errors.name?.message}
                          </p>
                        </div>

                        <div className="flex flex-col gap-1 w-9/12 mx-auto">
                          <label htmlFor="profileImage" className="text-sm">
                            Profile Picther
                          </label>
                          <input
                            onChange={handleFileChange}
                            type="file"
                            className="py-3 bg-[#ecf0f1] px-3  border-gray-300 border dark:text-white dark:bg-gray-800  dark:border-gray-600  outline-none text-sm rounded-md"
                          />
                          {profileUploadLoading ? (
                            <p className="text-blue-500 text-xs dark:text-red-400 font-semibold">
                              Uploading...
                            </p>
                          ) : (
                            ""
                          )}
                        </div>

                        <div className="flex flex-col gap-1 w-9/12 mx-auto">
                          <label htmlFor="profileImage" className="text-sm">
                            Background Photo
                          </label>
                          <input
                            onChange={handleBackgroundPhoto}
                            type="file"
                            className="py-3 bg-[#ecf0f1] px-3  border-gray-300 border dark:text-white dark:bg-gray-800  dark:border-gray-600  outline-none text-sm rounded-md"
                          />
                          {backgroundPhotoLoading ? (
                            <p className="text-blue-500 text-xs dark:text-red-400 font-semibold">
                              Uploading...
                            </p>
                          ) : (
                            ""
                          )}
                        </div>

                        <div className="w-9/12 mx-auto  ">
                          <AlertDialogFooter className="text-center space-x-3">
                            <AlertDialogCancel>Close</AlertDialogCancel>
                            {/* <AlertDialogAction>
                          <button type="submit">Save</button>
                        </AlertDialogAction> */}
                            {profileUploadLoading || backgroundPhotoLoading ? (
                              <button
                                disabled
                                type="submit"
                                className={`px-4 cursor-not-allowed rounded-md  py-1 bg-black text-white`}
                              >
                                Save
                              </button>
                            ) : (
                              <button
                                type="submit"
                                className={`px-4 rounded-md cursor-pointer py-1 bg-black text-white`}
                              >
                                {profileEditLoading ? "Loading..." : "Save"}
                              </button>
                            )}
                          </AlertDialogFooter>
                        </div>
                      </form>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>

                {/* Edit Button modal code end */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" flex-1">
        <div className="mt-2 h-[90vh] overflow-auto">
          <div className="space-y-8 w-full mx-auto ">
            {filteredNews?.map((news: NewsType) => (
              <NewsCard key={news?._id} news={news} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
