import { AuthContext } from "@/contex/AuthProvider";
import { AuthContextType } from "@/helper/Type";
import React, { ChangeEvent, useContext, useState } from "react";
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
type EditeProfileType = {
  name: string;
};
const profileEditSchema = yup.object({
  name: yup.string().required(),
});
const Profile = () => {
  const { user } = useContext(AuthContext as React.Context<AuthContextType>);

  const [profilePic, setProfilePic] = useState<string | undefined>(
    user?.photoURL
  );
  const [profileUploadLoading, setProfileUploadLoading] =
    useState<boolean>(false);
  const [profileEditLoading, setProfileEditLoading] = useState<boolean>(false);
  console.log(profilePic);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(profileEditSchema) });
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfileUploadLoading(true);
      const profileImageURL = await uploadImage(file);
      setProfilePic(profileImageURL);
      setProfileUploadLoading(false);
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
      }
      setProfileEditLoading(false);
      reset();
    } catch (error) {
      setProfileEditLoading(false);
      console.log(error);
    }
  };
  return (
    <div className="sm:mt-2 mt-4">
      <div className="sm:w-3/12 w-full  bg-white dark:bg-gray-800 rounded-md h-64 shadow-sm flex justify-center ">
        <div className="mt-7">
          <div className="w-20 h-20 mx-auto ring-offset-2 ring-8 rounded-full ">
            {user?.photoURL ? (
              <img
                className="w-full  h-full rounded-full  bg-contain"
                src={user?.photoURL}
                alt=""
              />
            ) : (
              <div className="font-bold capitalize bg-blue-600 sm:h-fullsm:w-full h-full w-full rounded-full text-xl flex justify-center items-center text-white">
                {user && user?.displayName?.slice(0, 2)}
              </div>
            )}
          </div>
          <div className="mt-6 space-y-2 text-center">
            <h1 className="text-xl font-extrabold text-purple-400">
              {user?.displayName}
            </h1>
            <h2 className="font-bold text-[15px] text-[#736980]">
              {user?.email}
            </h2>

            {/* Edit Button modal code start */}
            <div>
              <AlertDialog>
                <AlertDialogTrigger>
                  <button className="text-sm text-white font-bold rounded-sm textw bg-red-500 px-3 py-2">
                    Edit Profile
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="text-xl w-9/12 mx-auto font-semibold text-gray-500 dark:text-gray-400">
                      Edit Your Profile
                    </h1>
                    <div className="flex flex-col gap-1 w-9/12 mx-auto">
                      <input
                        {...register("name")}
                        defaultValue={user?.displayName}
                        type="text"
                        className="py-3 bg-[#ecf0f1] px-3  border-gray-300 border dark:text-white dark:bg-gray-800  dark:border-gray-600  outline-none text-sm rounded-md"
                      />
                      <p className="text-red-500 text-xs dark:text-red-400 font-semibold">
                        {" "}
                        {errors.name?.message}
                      </p>
                    </div>

                    <div className="flex flex-col gap-1 w-9/12 mx-auto">
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

                    <div className="w-9/12 mx-auto  ">
                      <AlertDialogFooter className="text-center space-x-3">
                        <AlertDialogCancel>Close</AlertDialogCancel>
                        {/* <AlertDialogAction>
                          <button type="submit">Save</button>
                        </AlertDialogAction> */}
                        {profileUploadLoading ? (
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
  );
};

export default Profile;
