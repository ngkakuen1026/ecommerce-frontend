import { useEffect, useState } from "react";
import type { UserType } from "../types/user";
import authAxios from "../services/authAxios";
import { userAPI } from "../services/http-api";
import { useParams } from "react-router-dom";

const UserData = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<UserType | null>(null); // Initialize as null

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await authAxios.get(
          `${userAPI.url}/admin/all-users/user/${id}`
        );
        console.log("[Admin] User data fetched successfully", response.data);
        setUser(response.data.user); 
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUserData();
  }, []); 

  return (
    <div className="p-6">
      {user ? (
        <>
          <h1 className="text-4xl font-semibold mb-4">
            User Details for {user.username}
          </h1>
          <p>Email: {user.email}</p>
          <p>First Name: {user.first_name}</p>
          <p>Last Name: {user.last_name}</p>
          <p>Phone: {user.phone}</p>
          <p>Gender: {user.gender}</p>
          <p>Bio: {user.bio}</p>
          <p>
            Registration Date:{" "}
            {user?.registration_date
              ? new Date(user?.registration_date).toLocaleString("en")
              : "Unknown"}
          </p>
          <p>Is Admin: {user.is_admin ? "Yes" : "No"}</p>
          {user.profile_image ? (
            <img
              src={user.profile_image}
              alt={`${user.username}'s profile`}
              className="w-48 h-48 rounded-full"
            />
          ) : (
            <img
              src="https://i.pinimg.com/236x/2c/47/d5/2c47d5dd5b532f83bb55c4cd6f5bd1ef.jpg"
              alt={`${user.username}'s profile`}
              className="w-48 h-48 rounded-full"
            />
          )}
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserData;
