import React from "react";
import { User } from "lucide-react";

interface UserHeaderProps {
  username: string;
  profileImage?: string;
  registrationDate?: string;
}

const UserHeader: React.FC<UserHeaderProps> = ({ username, profileImage, registrationDate }) => {
  return (
    <div className="bg-cyan-500 rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
      {profileImage ? (
        <img
          src={profileImage || "/default-avatar.png"}
          alt={username}
          className="w-24 h-24 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-white"
        />
      ) : (
        <User className="w-12 h-12" />
      )}
      <div className="text-center sm:text-left">
        <h1 className="text-2xl font-bold">{username}</h1>
        <p className="text-sm text-white mt-1">
          Joined {registrationDate ? new Date(registrationDate).toLocaleDateString() : "Unknown"}
        </p>
      </div>
    </div>
  );
};

export default UserHeader;