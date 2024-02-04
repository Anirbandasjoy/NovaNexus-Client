import { ChangeEvent, useContext, useState } from "react";
import { BsFillSendArrowDownFill } from "react-icons/bs";
import { RiAttachment2 } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AuthContextType, RegistationTypes } from "../../helper/Type";
import { AuthContext } from "../../contex/AuthProvider";
import RegistationLoading from "../../components/Loading/RegistationLoading";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";
import { uploadImage } from "../../api";
const schema = yup.object({
  fullname: yup.string().required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Z])(?=.*[\W_]).{6,}$/,
      "Password at least 6 char and one uppercase one spacial char"
    )
    .required(),
});

const Register = () => {
  const navigate = useNavigate();
  const { registerUser } = useContext(
    AuthContext as React.Context<AuthContextType>
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [profilePicText, setProfilePicText] = useState<string>(
    "Select You Profile Pic"
  );
  const [loading, setLoading] = useState(false);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [registerErr, setRegisterErr] = useState<string | null>(null);
  console.log(profilePic);

  const handleFileSelect = () => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    fileInput.click();
  };
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const profileImageURL = await uploadImage(file);
      setProfilePic(profileImageURL);
      setProfilePicText(file?.name || "Select Your Profile Pic");
      event.target.value = "";
    }
  };

  console.log(profilePic);
  const onSubmit = async (data: RegistationTypes) => {
    try {
      setRegisterErr(null);
      setLoading(true);
      const user = await registerUser(data?.email, data?.password);
      await updateProfile(user.user, {
        displayName: data?.fullname,
        photoURL: profilePic,
      });
      console.log(user);
      setLoading(false);
      toast.success("Registation Successfully");
      navigate("/");
      reset();
    } catch (error) {
      setLoading(false);
      console.error("Registration Error:", error);
      setRegisterErr("Somting Was Rong");
      // Handle registration error here if needed
    }
  };

  // console.log(profilePic?.name);
  // console.log(profilePic);
  return (
    <div className="px-2">
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white dark:bg-gray-800 px-8 sm:px-12 relative space-y-4 rounded-md py-12 sm:py-20 w-[35rem]">
          {registerErr && (
            <div className="py-3 bg-white text-center px-3  border-red-600 border dark:text-red-500 text-red-500   dark:border-red-600  outline-red-500 text-sm rounded-md">
              {registerErr}
            </div>
          )}
          <div>
            <h1 className="text-xl font-semibold text-gray-500 dark:text-gray-400">
              Please Register Now
            </h1>
          </div>
          <div className="">
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex items-center flex-col  gap-5">
                <div className="flex flex-col gap-1 w-full">
                  <input
                    type="text"
                    {...register("fullname")}
                    placeholder="Full Name"
                    className="py-3 bg-[#ecf0f1] px-3  border-gray-300 border dark:text-white dark:bg-gray-800  dark:border-gray-600  outline-none text-sm rounded-md"
                  />
                  <p className="text-red-500 text-xs dark:text-red-400 font-semibold">
                    {errors.fullname?.message}
                  </p>
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <input
                    type="text"
                    {...register("email")}
                    placeholder="Email"
                    className="py-3 bg-[#ecf0f1] px-3  border-gray-300 border dark:text-white dark:bg-gray-800  dark:border-gray-600  outline-none text-sm rounded-md"
                  />
                  <p className="text-red-500 text-xs dark:text-red-400 font-semibold">
                    {errors.email?.message}
                  </p>
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <input
                    type="password"
                    {...register("password")}
                    placeholder="Password"
                    className="py-3 bg-[#ecf0f1] px-3  border-gray-300 border dark:text-white dark:bg-gray-800  dark:border-gray-600  outline-none text-sm rounded-md"
                  />
                  <p className="text-red-500 text-xs dark:text-red-400 font-semibold">
                    {errors.password?.message}
                  </p>
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <RiAttachment2
                      className="sm:text-xl text-gray-500 dark:text-gray-400 cursor-pointer"
                      onClick={handleFileSelect}
                    />
                    <span
                      className="text-sm dark:text-gray-400 text-gray-500"
                      onClick={handleFileSelect}
                    >
                      {profilePicText}
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
              </div>

              {loading ? (
                <button
                  type="submit"
                  className="py-2 px-3 w-full rounded-md bg-[#1abc9c] text-gray-100  flex items-center justify-center gap-1 cursor-pointer"
                >
                  <RegistationLoading />
                </button>
              ) : (
                <button
                  type="submit"
                  className="py-2 px-3 w-full rounded-md bg-[#1abc9c] text-gray-100  flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span className="font-bold">Continue</span>
                  <BsFillSendArrowDownFill />
                </button>
              )}
              <p className="dark:text-gray-400">
                Not Register?please{" "}
                <Link to="/login" className="text-red-500">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
