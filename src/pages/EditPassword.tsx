import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import authAxios from "../services/authAxios";
import { userAPI } from "../services/http-api";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const EditPassword = () => {
  const [userInput, setUserInput] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showAllPassword, setShowAllPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setUserInput({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (userInput.newPassword !== userInput.confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    try {
      const response = await authAxios.patch(
        `${userAPI.url}/me/password/update`,
        {
          oldPassword: userInput.oldPassword,
          newPassword: userInput.newPassword,
        }
      );

      toast.success(response.data.message);
      setUserInput({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      console.error("Failed to update password:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to update password. Please try again."
      );
    }
  };

  return (
    <div className="w-1/2 max-w-screen-xl mx-auto p-6 sm:px-6">
      <div>
        <h1 className="text-4xl font-semibold">Edit Your Password</h1>
        <div className="flex justify-between">
          <h1 className="text-lg text-gray-400 italic">
            Enter your old password and new password
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="text-gray-500 cursor-pointer hover:underline"
          >
            Back
          </button>
        </div>
      </div>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label
            htmlFor="old-password"
            className="block text-sm font-medium text-gray-700"
          >
            Old Password
          </label>
          <div className="relative">
            <input
              type={showAllPassword ? "text" : "password"}
              id="old-password"
              name="oldPassword"
              required
              value={userInput.oldPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowAllPassword(!showAllPassword)}
              className="absolute right-3 top-2"
            >
              {showAllPassword ? (
                <EyeOffIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <label
            htmlFor="new-password"
            className="block text-sm font-medium text-gray-700"
          >
            New Password
          </label>
          <div className="relative">
            <input
              type={showAllPassword ? "text" : "password"}
              id="new-password"
              name="newPassword"
              required
              value={userInput.newPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowAllPassword(!showAllPassword)}
              className="absolute right-3 top-2"
            >
              {showAllPassword ? (
                <EyeOffIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <label
            htmlFor="confirm-password"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm New Password
          </label>
          <div className="relative">
            <input
              type={showAllPassword ? "text" : "password"}
              id="confirm-password"
              name="confirmPassword"
              required
              value={userInput.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowAllPassword(!showAllPassword)}
              className="absolute right-3 top-2"
            >
              {showAllPassword ? (
                <EyeOffIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
        </div>
        <div className="flex space-x-4 mt-6">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-200"
          >
            Update Password
          </button>
          <Link
            to="/user/myprofile"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-200"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditPassword;
