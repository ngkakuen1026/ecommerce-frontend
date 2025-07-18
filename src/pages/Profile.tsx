import { useEffect } from "react";
import authAxios from "../services/authAxios";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await authAxios.get("/dashboard/overview");
        console.log("Overview data:", response.data);
      } catch (error) {
        console.error("Error fetching overview data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>{user?.username}</h1>
      <h1>{user?.bio}</h1>
    </div>
  );
};

export default Profile;
