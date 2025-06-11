import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authAPI } from "../services/http-api";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone: "",
    gender: "",
    bio: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(`${authAPI.url}/register`, input);
      setSuccess(response.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 1500);
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
            src="../src/assets/register.png"
            alt="Register Illustration"
            className="w-full max-w-lg h-auto object-contain"
          />
        </div>

        {/* Register Form */}
        <div className="p-12 md:w-1/2 w-full space-y-8 overflow-y-auto max-h-[90vh]">
          <div>
            <h2 className="text-4xl font-extrabold text-gray-800 mb-2">
              Create Your Account 📝
            </h2>
            <p className="text-gray-600 text-lg">Register to get started!</p>
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded text-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4 text-base">
            {/* Username & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={input.username}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={input.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={input.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={input.first_name}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg"
              />
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={input.last_name}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>

            {/* Phone / Gender */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={input.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg"
              />
              <select
                name="gender"
                value={input.gender}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Bio / Profile Image */}
            <textarea
              name="bio"
              placeholder="Short Bio"
              value={input.bio}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg"
              rows={3}
            ></textarea>

            {/* Submit */}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold w-full text-lg"
            >
              Register
            </button>

            <p className="text-center text-sm text-gray-600 mt-2">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-blue-500 hover:underline cursor-pointer"
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

export default Register;
