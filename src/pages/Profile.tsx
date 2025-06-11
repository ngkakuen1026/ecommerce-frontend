import axios from "axios";
import { userAPI } from "../services/http-api";
import type { UserType } from "../types/user";
import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState<UserType | null>(null);
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) throw new Error("No authentication token found");

        const response = await axios.get(`${userAPI.url}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("User Data Response:", response.data.user);
        setUser(response.data.user);
      } catch (error) {
        let errorMessage = "An unknown error occurred";
        if (error && typeof error === "object" && "message" in error) {
          errorMessage = (error as { message: string }).message;
        }
        console.error(errorMessage);
      }
    };

    fetchUserInfo();
  }, []);
  return (
    <div>
      <h1>{user?.username}</h1> 
      <h1>{user?.username}</h1>
      <h1>{user?.bio}</h1>
    </div>
  );
};

export default Profile;
