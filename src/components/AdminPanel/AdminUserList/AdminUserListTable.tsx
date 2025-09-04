import { Link } from "react-router-dom";
import Spinner from "../../Reuseable/Spinner";
import type { UserType } from "../../../types/user";
import DOMPurify from "dompurify";

type AdminUserListTableProps = {
  users: UserType[];
  setUsers: React.Dispatch<React.SetStateAction<UserType[]>>;
  deleteUser: (userId: number) => void;
  isLoading: boolean;
};

const AdminUserListTable = ({
  users,
  setUsers,
  deleteUser,
  isLoading,
}: AdminUserListTableProps) => {
  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : users.length > 0 ? (
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
              <th className="py-3 px-4">Delete?</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const sanitizedBio = DOMPurify.sanitize(user.bio || "");
              return (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{user.id}</td>
                  <td className="py-3 px-4 font-semibold">
                    <Link
                      to={`user/${user.id}`}
                      className="text-blue-500 hover:underline"
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
                        alt={`${user.username}'s profile image`}
                        className="w-48 h-48 rounded-full object-cover"
                      />
                    ) : (
                      <img
                        src="https://i.pinimg.com/236x/2c/47/d5/2c47d5dd5b532f83bb55c4cd6f5bd1ef.jpg"
                        alt={`${user.username}'s profile image`}
                        className="w-48 h-48 rounded-full object-cover"
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
                    <button
                      className="text-red-500 hover:underline ml-2"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this user?"
                          )
                        ) {
                          deleteUser(user.id);
                          setUsers((prev) =>
                            prev.filter((u: UserType) => u.id !== user.id)
                          );
                        }
                      }}
                    >
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

export default AdminUserListTable;
