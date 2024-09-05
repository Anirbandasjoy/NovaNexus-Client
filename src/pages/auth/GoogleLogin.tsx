import { AuthContext } from "@/contex/AuthProvider";
import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAxios } from "@/hooks/axios/useAxios";

const GoogleLoginButton = () => {
  const authContext = useContext(AuthContext); // Get the context
  const location = localStorage.getItem("location");
  const navigate = useNavigate();
  const { axiosInstance } = useAxios();

  const handleGoogleLogin = async () => {
    try {
      if (!authContext || !authContext.googleUserLogin) {
        throw new Error("Google login method is not available");
      }

      // Trigger Google login through Firebase
      const result = await authContext.googleUserLogin();
      const user = result.user;

      // Prepare user data to send to your backend
      const userData = {
        fullName: user?.displayName,
        email: user?.email,
        profileImage: user?.photoURL || null,
        role: "user",
      };

      const { data: registrationData } = await axiosInstance.post(
        "/profile",
        userData
      );

      // Show success message
      console.log(registrationData);
      toast.success("Login Successful");

      navigate(location ? location : "/");
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Login failed");
    }
  };

  return (
    <button
      className="flex items-center justify-center w-full h-10 bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition"
      onClick={handleGoogleLogin}
    >
      <FcGoogle className="w-6 h-6 mr-2" />
      <span className="text-gray-600 font-medium">Sign in with Google</span>
    </button>
  );
};

export default GoogleLoginButton;
