import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import coverImage from "@/assets/cover.png";
import { useRegisterUserMutation } from "@/features/api/authApi";

const Signup = () => {
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [
    registerUser,
    { data: registerData, error: registerError, isSuccess: registerIsSuccess },
  ] = useRegisterUserMutation();

  const navigate = useNavigate();

  const resetFormData = () => {
    setSignupInput({ name: "", email: "", password: "" });
  };

  const validateForm = () => {
    const { name, email, password } = signupInput;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let errors = [];

    if (!name.trim()) errors.push("Name is required.");
    if (!email.trim()) errors.push("Email is required.");
    else if (!emailRegex.test(email)) errors.push("Invalid email format.");
    if (!password.trim()) errors.push("Password is required.");
    else if (password.length < 8)
      errors.push("Password must be at least 8 characters.");

    if (errors.length > 0) {
      errors.forEach((error) =>
        toast.error(error, { style: { color: "red" } })
      );
      return false;
    }
    return true;
  };

  const changeInputHandler = (e) => {
    setSignupInput({ ...signupInput, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    if (!validateForm()) return;
    await registerUser(signupInput);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSignup();
    }
  };

  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData.message || "Signup successful.", {
        style: { color: "green" },
      });
      resetFormData();
      navigate("/login");
    } else if (registerError) {
      toast.error(registerError.data?.message || "Signup failed.", {
        style: { color: "red" },
      });
    }
  }, [registerIsSuccess, registerError, registerData, navigate]);

  useEffect(() => {
    resetFormData();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 px-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl rounded-lg shadow-2xl overflow-hidden bg-white border border-gray-200 animate-fadeIn">
        {/* Image Section with Fade-in & Scale */}
        <div className="w-full md:w-1/2 bg-gray-100 relative animate-scaleIn">
          <img
            src={coverImage}
            alt="Cover"
            className="object-cover w-full h-full transition-transform duration-700 ease-in-out transform hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/70 to-transparent" />
        </div>

        {/* Signup form */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center bg-gray-50 rounded-r-lg shadow-inner">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4">
            Create an Account
          </h2>
          <p className="text-center text-gray-500 mb-6 animate-slideInRight delay-100">
            Sign up for a new account.
          </p>

          <form className="space-y-5" onKeyDown={handleKeyDown}>
            <div className="animate-slideInRight delay-200">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={signupInput.name}
                onChange={changeInputHandler}
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-black/40"
              />
            </div>

            <div className="animate-slideInRight delay-300">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={signupInput.email}
                onChange={changeInputHandler}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-black/40"
              />
            </div>

            {/* password field */}
            <div className="animate-slideInRight delay-400 relative">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={signupInput.password}
                  onChange={changeInputHandler}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 pr-12 border rounded-lg focus:ring focus:ring-black/40"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center justify-center text-gray-500"
                >
                  {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
              </div>
            </div>

            <button
              onClick={handleSignup}
              type="button"
              className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-700 transition-transform duration-500 ease-out animate-slideInRight delay-500"
            >
              Signup
            </button>

            {/* navigate to login page */}
            <p className="text-center text-gray-600 mt-4 animate-slideInRight delay-600">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Login
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
