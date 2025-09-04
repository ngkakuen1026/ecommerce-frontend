import { useEffect, useState } from "react";
import authAxios from "../services/authAxios";
import { userAPI } from "../services/http-api";
import type { UserType } from "../types/user";
import AdminUserListControl from "../components/AdminPanel/AdminUserList/AdminUserListControl";
import AdminUserListTable from "../components/AdminPanel/AdminUserList/AdminUserListTable";

const AdminUserList = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [usersPerPage, setUsersPerPage] = useState(10);

  const fetchUsers = async () => {
    let active = true;
    setSearching(true);

    try {
      let res;
      if (searchQuery.trim() === "") {
        res = await authAxios.get(`${userAPI.url}/admin/all-users`);
      } else {
        res = await authAxios.get(
          `${userAPI.url}/admin/all-users/search?query=${encodeURIComponent(
            searchQuery
          )}`
        );
      }
      if (active) {
        setUsers(res.data.users);
        console.log("Search response:", res.data);
        setCurrentPage(1);
      }
      console.log("[Admin] Users data fetched successfully", res.data);
    } catch (error) {
      if (active) setUsers([]);
      console.error("Error fetching admin data", error);
    } finally {
      if (active) setSearching(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [searchQuery]);

  const sortedUsers = [...users];
  switch (sortOption) {
    case "des":
      sortedUsers.sort((a, b) => b.id - a.id);
      break;
    case "asc":
      sortedUsers.sort((a, b) => a.id - b.id);
      break;
    case "role":
      sortedUsers.sort((a, b) => {
        if (a.is_admin === b.is_admin) return 0;
        return a.is_admin ? -1 : 1;
      });
      break;
    case "newest":
      sortedUsers.sort(
        (a, b) =>
          new Date(b.registration_date).getTime() -
          new Date(a.registration_date).getTime()
      );
      break;
    default:
      break;
  }

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUser = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

  const deleteUser = async (userId: number) => {
    try {
      const repsonse = await authAxios.delete(
        `${userAPI.url}/admin/${userId}/delete`
      );
      console.log("[Admin] User deleted successfully", repsonse.data);
    } catch (error) {
      console.error("[Admin] Error deleting user", error);
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-semibold mb-4">All Registered Users</h1>
      <h2 className="text-xl text-gray-500 mb-4">
        This is the admin panel where you can manage all registered users. You
        can view their details, edit their information, and delete users if
        necessary.
      </h2>

      <AdminUserListControl
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortOption={sortOption}
        setSortOption={setSortOption}
        usersPerPage={usersPerPage}
        setUsersPerPage={setUsersPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        searching={searching}
      />

      <AdminUserListTable
        users={currentUser}
        setUsers={setUsers}
        deleteUser={deleteUser}
        isLoading={isLoading}
      />
    </div>
  );
};

export default AdminUserList;
