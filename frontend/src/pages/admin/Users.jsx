import React, { useEffect, useState } from "react";
import { useGetUsersQuery, useDeleteUserMutation } from "@/features/api/authApi"; 
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
      setUsers(users.filter((user) => user._id !== userId)); // Remove the user from the UI
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error loading users.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold mb-6">All Users</h1>
      <table className="min-w-full table-auto border-separate border-spacing-2">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="px-4 py-2 text-left">Image</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Role</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="bg-white hover:bg-gray-50">
              <td className="px-4 py-2">
                <Avatar className="h-12 w-12 rounded-full">
                  <AvatarImage
                    src={user?.photoUrl || "https://github.com/shadcn.png"}
                    alt={user?.name || "User Avatar"}
                    className="rounded-full"  // Ensure the image is circular
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </td>
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.role}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-300"
                >
                  Delete
                </button>
                <Link to={`/admin/user/${user._id}`} className="ml-2 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-300">
                  View Profile
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
