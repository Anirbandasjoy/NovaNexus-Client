import { BsFillSendArrowDownFill } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AuthContextType, LoginTypes } from "../../helper/Type";
import { AuthContext } from "../../contex/AuthProvider";
import RegistationLoading from "../../components/Loading/RegistationLoading";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
const schema = yup.object({
  email: yup.string().email().required(),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Z])(?=.*[\W_]).{6,}$/,
      "Password at least 6 char and one uppercase one spacial char"
    )
    .required(),
});

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useContext(
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

  const [loading, setLoading] = useState(false);
  const [registerErr, setRegisterErr] = useState<string | null>(null);

  const onSubmit = async (data: LoginTypes) => {
    try {
      setRegisterErr(null);
      setLoading(true);
      const user = await loginUser(data?.email, data?.password);
      console.log(user);
      setLoading(false);
      toast.success("Login Successfully");
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
        <div className="bg-white dark:bg-gray-800 px-8  sm:px-12 space-y-4 rounded-md py-12 sm:py-20 w-[35rem]">
          {registerErr && (
            <div className="py-3 bg-white text-center px-3  border-red-600 border dark:text-red-500 text-red-500   dark:border-red-600  outline-red-500 text-sm rounded-md">
              {registerErr}
            </div>
          )}
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold  text-gray-500 dark:text-gray-400">
              Please Login Now
            </h1>
            <div
              className="text-gray-400 mr-1  right-12 cursor-pointer text-lg font-bold "
              onClick={() => {
                navigate(-1);
              }}
            >
              <FaArrowAltCircleLeft className=" text-xl" />
            </div>
          </div>
          <div className="">
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex items-center flex-col  gap-5">
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
                <Link to="/register" className="text-red-500">
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
