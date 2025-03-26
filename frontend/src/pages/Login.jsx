import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import coverImage from "@/assets/cover.png";
import { useLoginUserMutation } from "@/features/api/authApi";

const Login = () => {
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [
    loginUser,
    { data: loginData, error: loginError, isSuccess: loginIsSuccess },
  ] = useLoginUserMutation();

  const navigate = useNavigate();

  const resetFormData = () => {
    setLoginInput({ email: "", password: "" });
  };

  const validateForm = () => {
    const { email, password } = loginInput;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let errors = [];

    if (!email.trim()) {
      errors.push("Email is required.");
    } else if (!emailRegex.test(email)) {
      errors.push("Invalid email format.");
    }

    if (!password.trim()) {
      errors.push("Password is required.");
    } else if (password.length < 8) {
      errors.push("Password must be at least 8 characters.");
    }

    if (errors.length > 0) {
      errors.forEach((error) => {
        toast.error(error, { style: { color: "red" } });
      });
      return false;
    }
    return true;
  };

  const changeInputHandler = (e) => {
    setLoginInput({ ...loginInput, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    await loginUser(loginInput);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleLogin(e);
    }
  };

  useEffect(() => {
    if (loginIsSuccess && loginData) {
      toast.success(loginData.message || "Login successful.", {
        style: { color: "green" },
      });
      resetFormData();
      navigate("/");
    } else if (loginError) {
      toast.error(loginError.data?.message || "Login failed.", {
        style: { color: "red" },
      });
    }
  }, [loginIsSuccess, loginError, loginData, navigate]);

  useEffect(() => {
    resetFormData();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 px-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl rounded-lg shadow-2xl overflow-hidden bg-white border border-gray-200">
        {/* Image Section */}
        <div className="w-full md:w-1/2 bg-gray-100 relative">
          <img
            src={coverImage}
            alt="Cover"
            className="object-cover w-full h-full transition-transform duration-700 ease-in-out transform hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/70 to-transparent" />
        </div>

        {/* Login Form */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center bg-gray-50 rounded-r-lg shadow-inner">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Welcome Back
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Login into your account.
          </p>

          <form className="space-y-4" onKeyDown={handleKeyDown}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={loginInput.email}
                onChange={changeInputHandler}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-black/40"
              />
            </div>

            {/* Password Field with Eye Icon */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={loginInput.password}
                  onChange={changeInputHandler}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 pr-12 border rounded-lg focus:ring focus:ring-black/40"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center justify-center h-full text-gray-500 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="mr-2"
                />
                Remember Me
              </label>
              <a
                href="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="button"
              onClick={handleLogin}
              className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-700"
            >
              Login
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-gray-600 mt-4">
              Do not have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Sign Up
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
