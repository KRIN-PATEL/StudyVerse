import React, { useEffect, useState } from "react";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "@/features/api/authApi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

const Users = () => {
  const { data, error, isLoading } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (data) {
      setUsers(data.users);
    }
  }, [data]);

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-10 text-gray-800 dark:text-gray-200">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">Error loading users.</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 mt-20">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-separate border-spacing-2 rounded-lg shadow-lg">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 dark:text-gray-300">
            {users.map((user) => (
              <tr
                key={user._id}
                className="bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <td className="px-4 py-3">
                  <Avatar className="h-12 w-12 rounded-full">
                    <AvatarImage
                      src={user?.photoUrl || "https://github.com/shadcn.png"}
                      alt={user?.name || "User Avatar"}
                      className="rounded-full object-cover"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </td>
                <td className="px-4 py-3">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3 capitalize">{user.role}</td>
                <td className="px-4 py-3 flex flex-wrap gap-2">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-300"
                  >
                    Delete
                  </button>
                  <Link
                    to={`/admin/user/${user._id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-300"
                  >
                    View Profile
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
