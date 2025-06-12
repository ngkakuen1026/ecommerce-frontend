import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authAPI } from "../services/http-api";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { checkAuth } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setError("");

  try {
    const response = await axios.post(`${authAPI.url}/login`, input, {
      withCredentials: true,
    });

    const token = response.data.accessToken;
    if (!token) throw new Error("Token not found in response");

    // Update global auth state
    await checkAuth();

    navigate("/");
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (error && typeof error === "object" && "message" in error) {
      errorMessage = (error as { message: string }).message;
    }
    setError(errorMessage);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-20">
      <div className="bg-white shadow-2xl rounded-2xl flex flex-col md:flex-row overflow-hidden max-w-6xl w-full">
        {/* Illustration */}
        <div className="bg-blue-50 flex items-center justify-center p-12 md:w-1/2">
          <img
            src="../src/assets/login.png"
            alt="Shopping Illustration"
            className="w-full max-w-lg h-auto object-contain"
          />
        </div>

        {/* Login Form */}
        <div className="p-12 md:w-1/2 w-full space-y-10">
          <div>
            <h2 className="text-4xl font-extrabold text-gray-800 mb-3">
              Welcome Back 👋
            </h2>
            <p className="text-gray-600 text-lg">
              Please log in to your account.
            </p>
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-3 text-base rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6 text-lg">
            <div>
              <label htmlFor="email" className="block mb-2 text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={input.email}
                onChange={handleChange}
                className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={input.password}
                  onChange={handleChange}
                  className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-base">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-blue-500 w-5 h-5"
                />
                <span className="text-gray-700">Remember Me</span>
              </label>
              <a href="#" className="text-blue-500 hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-lg rounded-lg font-semibold w-full"
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="border border-gray-300 text-gray-800 px-8 py-3 text-lg rounded-lg font-semibold w-full hover:bg-gray-100"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
