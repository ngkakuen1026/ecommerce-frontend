import React, { useEffect, useState } from "react";

import { PencilOff, Save, SquarePen, Trash } from "lucide-react";
import { toast } from "react-toastify";

import { Link } from "react-router-dom";
import type { UserType } from "../../../../types/user";
import authAxios from "../../../../services/authAxios";
import { userAPI } from "../../../../services/http-api";
import Spinner from "../../../Reuseable/Spinner";
import TinyMCEEditor from "../../../Reuseable/TinyMCEEditor";

import DOMPurify from "dompurify";

interface UserInfoProps {
  user: UserType;
  onUserUpdated: () => void;
}

const AdminUserInfo: React.FC<UserInfoProps> = ({ user, onUserUpdated }) => {
  const [userInput, setUserInput] = useState<UserType>({
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username,
    email: user.email,
    phone: user.phone,
    bio: user.bio,
    is_admin: user.is_admin,
    gender: user.gender,
    profile_image: user.profile_image,
    registration_date: user.registration_date,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (content: string) => {
    setUserInput((prev) => ({ ...prev, bio: content }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Selected file:", file);
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      console.log("No file selected.");
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    setUserInput({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      bio: user.bio,
      is_admin: user.is_admin,
      gender: user.gender,
      profile_image: user.profile_image,
      registration_date: user.registration_date,
    });
  }, [user]);

  const handleCancel = () => {
    setIsEditing(false);
    setUserInput({
      id: user.id,
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      username: user.username || "",
      email: user.email || "",
      phone: user.phone || "",
      gender: user.gender,
      bio: user.bio || "",
      is_admin: user.is_admin,
      profile_image: user.profile_image,
      registration_date: user.registration_date,
    });
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSave = async () => {
    //Validation
    const namePattern = /^[a-zA-Z\s]+$/;
    const usernamePattern = /^[a-zA-Z0-9_]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{8}$/;
    const validGenders = ["Male", "Female", "Other"];

    if (!userInput.first_name || !namePattern.test(userInput.first_name)) {
      toast.error("Invalid first name. Only letters and spaces are allowed.");
      return;
    }

    if (!userInput.last_name || !namePattern.test(userInput.last_name)) {
      toast.error("Invalid last name. Only letters and spaces are allowed.");
      return;
    }

    if (!userInput.username || !usernamePattern.test(userInput.username)) {
      toast.error(
        "Invalid username. Only letters, numbers, and underscores are allowed."
      );
      return;
    }

    if (!userInput.email || !emailPattern.test(userInput.email)) {
      toast.error("Invalid email format.");
      return;
    }

    if (!userInput.phone || !phonePattern.test(userInput.phone)) {
      toast.error("Invalid phone number. Must be 8 digits.");
      return;
    }

    if (!validGenders.includes(userInput.gender ?? "")) {
      toast.error("Please select a valid gender.");
      return;
    }

    try {
      const response = await authAxios.patch(
        `${userAPI.url}/admin/${user.id}/update`,
        userInput
      );

      console.log("[Admin] User data updated successfully", response.data);

      setIsLoading(true);

      if (imageFile) {
        const formData = new FormData();
        formData.append("profile_image", imageFile);

        console.log("Uploading image:", imageFile);

        const imageResponse = await authAxios.post(
          `${userAPI.url}/admin/${user.id}/profile-image`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("[Admin] Image upload response:", imageResponse.data);

        response.data.user.profile_image =
          imageResponse.data.user.profile_image;
      }
      if (onUserUpdated) onUserUpdated();

      toast.success("[Admin] User data updated successfully");
      setIsEditing(false);
      setImageFile(null);
      setImagePreview(null);
    } catch (error) {
      console.error("[Admin] Error updating user data", error);
      toast.error("[Admin] Error updating user data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteImage = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your profile image? This action cannot be undone."
    );

    setIsLoading(true);

    if (confirmDelete) {
      try {
        const response = await authAxios.delete(
          `${userAPI.url}/admin/${user.id}/profile-image`,
          {
            withCredentials: true,
          }
        );
        console.log(
          "[Admin] Profile image deleted successfully:",
          response.data
        );

        toast.success("[Admin] Profile image deleted successfully.");
      } catch (error) {
        console.error("Failed to delete profile image:", error);
        toast.error("Failed to delete profile image. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("Profile image deletion canceled by the user.");
    }
  };

  const sanitizedBio = DOMPurify.sanitize(user.bio || "");

  return (
    <div className="flex flex-row w-2/3 gap-6 bg-gray-50 p-6 rounded-sm shadow-lg">
      <div className="flex-1 ">
        <div className="relative w-64 h-64 group mx-auto">
          {isLoading ? (
            <div className="items-center justify-center flex h-64">
              <Spinner />
            </div>
          ) : imagePreview ? (
            <img
              src={imagePreview}
              alt="Profile preview"
              className="w-64 h-64 rounded-full object-cover border border-black"
            />
          ) : user?.profile_image ? (
            <img
              src={user.profile_image}
              alt={`image of user ${user.username}`}
              className="w-64 h-64 rounded-full object-cover border border-black"
            />
          ) : (
            <img
              src="https://i.pinimg.com/236x/2c/47/d5/2c47d5dd5b532f83bb55c4cd6f5bd1ef.jpg"
              alt="Default profile"
              className="w-64 h-64 rounded-full object-cover border border-black"
            />
          )}

          <div className="absolute inset-0 rounded-full bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <label
              htmlFor="profile_image"
              className={`text-white text-lg font-semibold text-center ${
                isEditing ? "cursor-pointer" : ""
              }`}
            >
              {isEditing
                ? user.profile_image
                  ? "Edit Profile Image"
                  : "Add Profile Image"
                : "Click Edit User Icon to Edit Image"}
            </label>
            <input
              type="file"
              id="profile_image"
              name="profile_image"
              accept="image/*"
              className="hidden"
              disabled={!isEditing}
              onChange={handleFileChange}
            />
            {user?.profile_image ? (
              isEditing ? (
                <button
                  type="button"
                  onClick={handleDeleteImage}
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-label="Delete profile image"
                >
                  <Trash />
                </button>
              ) : null
            ) : null}
          </div>
        </div>
        {imagePreview && (
          <div className="text-center italic text-gray-500">
            Remember to press save to update user's image
          </div>
        )}
        <div className="bg-white rounded-lg shadow-lg p-6 my-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <p className="text-lg">
                <span className="font-semibold">ID:</span> {user.id}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Email:</span> {user.email}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Phone:</span> {user.phone}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Gender:</span> {user.gender}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-lg">
                <span className="font-semibold">Name:</span> {user.first_name}{" "}
                {user.last_name}
              </p>
              <div>
                <span className="font-semibold">Bio:</span>
                <p
                  className="py-3 px-4"
                  dangerouslySetInnerHTML={{ __html: sanitizedBio }}
                ></p>
              </div>

              <p className="text-lg">
                <span className="font-semibold">Registration Date: </span>
                {user.registration_date
                  ? new Date(user.registration_date).toLocaleString("en")
                  : "Unknown"}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Role:</span>{" "}
                {user.is_admin ? "Admin" : "Normal User"}
              </p>
            </div>
          </div>
          <Link
            to={`/user/${user.username}`}
            className="mt-4 inline-block text-blue-500 hover:underline font-semibold"
          >
            View Public Profile
          </Link>
        </div>
      </div>
      <form className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold mb-4">
            {isEditing ? "Edit User Information" : "Basic Information"}
          </h2>
          <div className="flex gap-2">
            <button
              title="Edit User"
              type="button"
              className={`${
                isEditing ? "hidden" : ""
              } cursor-pointer hover:opacity-70`}
              onClick={handleEdit}
              disabled={isLoading}
            >
              <SquarePen size={18} />
            </button>
            <button
              title="Save Changes"
              type="button"
              className={`${
                isEditing ? "" : "hidden"
              } cursor-pointer hover:opacity-70`}
              onClick={handleSave}
              disabled={isLoading || !isEditing}
            >
              <Save size={18} />
            </button>
            <button
              title="Cancel Editing"
              type="button"
              className={`${
                isEditing ? "" : "hidden"
              } cursor-pointer hover:opacity-70`}
              onClick={handleCancel}
              disabled={isLoading || !isEditing}
            >
              <PencilOff size={18} />
            </button>
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block font-semibold">First Name</label>
            <input
              name="first_name"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
              disabled={isLoading || !isEditing}
              value={userInput.first_name ?? ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold">Last Name</label>
            <input
              name="last_name"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
              disabled={isLoading || !isEditing}
              value={userInput.last_name}
              onChange={handleChange}
            />
          </div>
        </div>
        <label className="block font-semibold">Username</label>
        <input
          name="username"
          type="text"
          value={userInput.username ?? ""}
          className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
          disabled={isLoading || !isEditing}
          onChange={handleChange}
        />
        <label className="block font-semibold">Email</label>
        <input
          name="email"
          type="email"
          value={userInput.email}
          className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
          disabled={isLoading || !isEditing}
          onChange={handleChange}
        />
        <label className="block font-semibold">Bio</label>
        <TinyMCEEditor
          value={userInput.bio ?? ""}
          onEditorChange={handleEditorChange}
          disabled={isLoading || !isEditing}
        />
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block font-semibold">Phone number</label>
            <input
              className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-1"
              placeholder="User phone number"
              type="tel"
              name="phone"
              disabled={isLoading || !isEditing}
              value={userInput.phone}
              onChange={handleChange}
              maxLength={8}
            />
          </div>
          <div>
            <label className="block font-semibold">Gender</label>
            <select
              name="gender"
              id="gender"
              disabled={isLoading || !isEditing}
              value={userInput.gender ?? ""}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-400 rounded focus:outline-none focus:ring-1"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminUserInfo;
