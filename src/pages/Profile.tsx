import { userAPI } from "../services/http-api";
import type { UserType } from "../types/user";
import { useEffect, useState } from "react";
import authAxios from "../services/authAxios";

const Profile = () => {
  const [user, setUser] = useState<UserType | null>(null);
  useEffect(() => {
    authAxios
      .get(`${userAPI.url}/me`)
      .then((res) => {
        const fetchedUser = res.data.user;
        setUser(fetchedUser);
        console.log(fetchedUser)
      })
      .catch((err) => console.error("Failed to fetch user:", err));
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
