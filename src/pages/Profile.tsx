import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import authAxios from "../services/authAxios";
import { userAPI } from "../services/http-api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import TinyMCEEditor from "../components/Reuseable/TinyMCEEditor";
import { Trash } from "lucide-react";
import type { UserType } from "../types/user";
import Spinner from "../components/Reuseable/Spinner";

const Profile = () => {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(true); // New loading state
  const [userInput, setUserInput] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    gender: user?.gender || "",
    bio: user?.bio || "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUserInput({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
        bio: user.bio,
      });
      setLoading(false);
    } else {
      const fetchUserData = async () => {
        try {
          const response = await authAxios.get(`${userAPI.url}/me`);
          setUser(response.data.user);
          setLoading(false);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          setLoading(false);
        }
      };
      fetchUserData();
    }
  }, [user, setUser]);

  useEffect(() => {
    if (!loading && !user) {
      console.log("Redirecting to /register...");
      navigate("/register");
    }
  }, [user, loading, navigate]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  const handleSave = async () => {
    // Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[2-9][0-9]{7}$/;

    if (!userInput.first_name || !/^[A-Za-z\s]+$/.test(userInput.first_name)) {
      toast.error("Please enter a valid first name.");
      return;
    }

    if (!userInput.last_name || !/^[A-Za-z\s]+$/.test(userInput.last_name)) {
      toast.error("Please enter a valid last name.");
      return;
    }

    if (!userInput.email || !emailPattern.test(userInput.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!phonePattern.test(userInput.phone)) {
      toast.error("Please enter a valid HK phone number.");
      return;
    }

    const validGenders = ["Male", "Female", "Other"];
    if (!validGenders.includes(userInput.gender)) {
      toast.error("Please select a valid gender.");
      return;
    }

    try {
      const response = await authAxios.patch(
        `${userAPI.url}/me/update`,
        userInput
      );

      console.log("User data updated:", response.data.user);

      if (imageFile) {
        const formData = new FormData();
        formData.append("profile_image", imageFile);

        console.log("Uploading image:", imageFile);

        const imageResponse = await authAxios.post(
          `${userAPI.url}/me/profile-image`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Image upload response:", imageResponse.data);

        response.data.user.profile_image =
          imageResponse.data.user.profile_image;
      }

      setUser(response.data.user);
      toast.success("User Profile Updated Successfully.");
      console.log("Profile updated:", response.data.user);
      setIsEditing(false);
      setImageFile(null);
      setImagePreview(null);
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (confirmDelete) {
      try {
        const response = await authAxios.delete(`${userAPI.url}/me/delete`, {
          withCredentials: true,
        });
        console.log("Account deleted successfully:", response.data);
        setUser(null);
        toast.success("Account deleted successfully.");
      } catch (error) {
        console.error("Failed to delete account:", error);
        toast.error("Failed to delete account. Please try again.");
      }
    } else {
      console.log("Account deletion canceled by the user.");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUserInput({
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      gender: user?.gender || "",
      bio: user?.bio || "",
    });
    setImageFile(null);
    setImagePreview(null);
  };

  const handleDeleteImage = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your profile image? This action cannot be undone."
    );

    if (confirmDelete) {
      try {
        const response = await authAxios.delete(
          `${userAPI.url}/me/profile-image/delete`
        );
        console.log("Profile image deleted successfully:", response.data);

        setUser((prevUser: UserType | null) => ({
          ...prevUser,
          profile_image: null,
        }));

        toast.success("Profile image deleted successfully.");
      } catch (error) {
        console.error("Failed to delete profile image:", error);
        toast.error("Failed to delete profile image. Please try again.");
      }
    } else {
      console.log("Profile image deletion canceled by the user.");
    }
  };

  const sanitizedBio = DOMPurify.sanitize(user?.bio || "");

  // Show loading message while data is being fetched
  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="my-profile w-full max-w-screen-xl mx-auto p-6 sm:px-6">
      <div className="flex flex-row gap-24">
        <div className="flex flex-col items-center w-1/3">
          <div className="relative group">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Profile preview"
                className="w-64 h-64 rounded-full object-cover border border-black"
              />
            ) : user?.profile_image ? (
              <img
                src={user?.profile_image}
                alt={`image of user ${user?.username}`}
                className="w-64 h-64 rounded-full object-cover border border-black"
              />
            ) : (
              <img
                src="https://i.pinimg.com/236x/2c/47/d5/2c47d5dd5b532f83bb55c4cd6f5bd1ef.jpg"
                alt="Default profile"
                className="w-64 h-64 rounded-full object-cover border border-black"
              />
            )}

            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full">
              <label
                htmlFor="profile_image"
                className={`text-white text-lg font-semibold text-center ${
                  isEditing ? "cursor-pointer" : ""
                }`}
              >
                {isEditing
                  ? user?.profile_image
                    ? "Edit Profile Image"
                    : "Add Profile Image"
                  : "Click Edit Profile to Change Profile Image"}
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
            </div>
            {user?.profile_image && isEditing ? (
              <button
                type="button"
                onClick={handleDeleteImage}
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-label="Delete profile image"
              >
                <Trash />
              </button>
            ) : null}
          </div>
          <Link
            to={`/user/${user?.username}`}
            className="hover:opacity-50"
            target="_blank"
          >
            <h1
              className={
                user?.gender === "Male"
                  ? "text-2xl font-bold mt-4 text-blue-500"
                  : user?.gender === "Female"
                  ? "text-2xl font-bold mt-4 text-red-500"
                  : "text-2xl font-bold mt-4 text-black"
              }
            >
              {user?.username}
            </h1>
          </Link>
          <p
            className={
              user?.is_admin
                ? "text-lg bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 bg-clip-text text-transparent"
                : "text-lg text-black"
            }
          >
            You're {user?.is_admin ? "Admin" : "Normal User"}
          </p>
          <p className="text-gray-600">
            Registered at{" "}
            {user?.registration_date
              ? new Date(user?.registration_date).toLocaleString("en")
              : "Unknown"}
          </p>
          <p className="text-gray-600 text-xl font-semibold mt-4">
            {user?.last_name} {user?.first_name}
          </p>
          <p className="text-gray-600">{user?.email}</p>
          <div
            className="text-xl leading-relaxed text-gray-800 mt-4"
            dangerouslySetInnerHTML={{ __html: sanitizedBio }}
          />
        </div>

        <form className="flex-1 space-y-4">
          <h1 className="text-4xl font-semibold">
            {isEditing ? "Edit Your Information" : "Account Information"}
          </h1>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block font-semibold">First Name</label>
              <input
                className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-1"
                placeholder="User first name"
                type="text"
                name="first_name"
                disabled={!isEditing}
                value={userInput.first_name}
                onChange={handleChange}
              />
            </div>
            <div className="flex-1">
              <label className="block font-semibold">Last Name</label>
              <input
                className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-1"
                placeholder="User last name"
                type="text"
                name="last_name"
                disabled={!isEditing}
                value={userInput.last_name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label className="block font-semibold">Email</label>
            <input
              className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-1"
              placeholder="User email"
              type="email"
              name="email"
              disabled={!isEditing}
              value={userInput.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block font-semibold">Bio</label>
            <TinyMCEEditor
              value={userInput.bio}
              onEditorChange={handleEditorChange}
              disabled={!isEditing}
            />
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block font-semibold">Phone number</label>
              <input
                className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-1"
                placeholder="User phone number"
                type="tel"
                name="phone"
                pattern="^[2-9][0-9]{7}$"
                disabled={!isEditing}
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
                disabled={!isEditing}
                value={userInput.gender}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 border border-gray-400 rounded focus:outline-none focus:ring-1"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="flex space-x-4 mt-6">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleEdit}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Edit Profile
                </button>
                <Link
                  to="/user/myprofile/change-pw"
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Change Password
                </Link>
              </>
            )}
          </div>
          <div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={handleDelete}
            >
              Delete Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
