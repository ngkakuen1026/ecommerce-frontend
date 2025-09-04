import React from "react";
import { Link } from "react-router-dom";
import type { UserType } from "../../../../types/user";

interface AdminUserDataBreadcrumbProps {
  user: UserType;
  onBack: () => void;
}

const AdminUserDataBreadcrumb: React.FC<AdminUserDataBreadcrumbProps> = ({
  user,
  onBack,
}) => {
  return (
    <div className="flex justify-between gap-2 mb-8 text-gray-500">
      <p>
        <Link to="/admin-panel/all-users-list" className="hover:opacity-70">
          All Users
        </Link>{" "}
        &gt;{" "}
        <span className="text-black font-semibold">
          {user.username} (User ID: {user.id})
        </span>{" "}
        &gt; Update User Details
      </p>
      <button
        onClick={onBack}
        className="text-gray-500 cursor-pointer hover:underline"
      >
        Back
      </button>
    </div>
  );
};

export default AdminUserDataBreadcrumb;
