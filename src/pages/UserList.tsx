import { useEffect, useState } from "react";
import authAxios from "../services/authAxios";
import { userAPI } from "../services/http-api";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  gender: string;
  bio: string;
  profile_image?: string;
  registration_date?: string;
  is_admin: boolean;
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await authAxios.get(`${userAPI.url}/admin/all-users`);
        console.log("Admin data fetched successfully", response.data);
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching admin data", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-4xl font-semibold mb-4">
        List of All Registered User
      </h1>
      <h2 className="text-xl text-gray-500 mb-4">
        This is the admin panel where you can manage all registered users. You
        can view their details, edit their information, and delete users if
        necessary.
      </h2>

      <h2 className="text-xl font-semibold mt-6">User List</h2>
      {users.length > 0 ? (
        <table className="min-w-full border-collapse border border-gray-200 mt-4">
          <thead>
            <tr className="bg-gray-100 text-left border-b">
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Username</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">First Name</th>
              <th className="py-3 px-4">Last Name</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Gender</th>
              <th className="py-3 px-4">Bio</th>
              <th className="py-3 px-4">Profile Image</th>
              <th className="py-3 px-4">Registration Date</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const sanitizedBio = DOMPurify.sanitize(user.bio || "");
              return (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{user.id}</td>
                  <td className="py-3 px-4">
                    <Link
                      to={`/admin-panel/all-user-list/user/${user.id}`}
                      className="text-blue-500 font-semibold hover:underline hover:opacity-50"

                    >
                      {user.username}
                    </Link>
                  </td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">{user.first_name}</td>
                  <td className="py-3 px-4">{user.last_name}</td>
                  <td className="py-3 px-4">{user.phone}</td>
                  <td className="py-3 px-4">{user.gender}</td>
                  <td
                    className="py-3 px-4"
                    dangerouslySetInnerHTML={{ __html: sanitizedBio }}
                  ></td>
                  <td className="py-3 px-4">
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
                  </td>
                  <td className="py-3 px-4">
                    {user?.registration_date
                      ? new Date(user?.registration_date).toLocaleString("en")
                      : "Unknown"}
                  </td>
                  <td className="py-3 px-4">
                    {user.is_admin ? "Admin" : "Normal User"}
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-blue-500 hover:underline">
                      Edit
                    </button>
                    <button className="text-red-500 hover:underline ml-2">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default UserList;
