// import React, { useEffect, useState } from "react";
// import { useGetUsersQuery, useDeleteUserMutation } from "@/features/api/authApi"; // Importing delete mutation

// const Users = () => {
//   const { data, error, isLoading } = useGetUsersQuery(); // Fetch users
//   const [deleteUser] = useDeleteUserMutation(); // For deleting a user
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     if (data) {
//       setUsers(data.users); // Set users when data is available
//     }
//   }, [data]);

//   const handleDelete = async (userId) => {
//     try {
//       await deleteUser(userId); // Call delete mutation
//       setUsers(users.filter(user => user._id !== userId)); // Remove the user from the UI
//     } catch (err) {
//       console.error("Error deleting user:", err);
//     }
//   };

//   if (isLoading) {
//     return <div className="text-center py-10">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-center py-10 text-red-500">Error loading users.</div>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-6">
//       <h1 className="text-3xl font-semibold mb-6">All Users</h1>
//       <table className="min-w-full table-auto border-separate border-spacing-2">
//         <thead>
//           <tr className="bg-gray-100 text-gray-700">
//             <th className="px-4 py-2 text-left">Image</th>
//             <th className="px-4 py-2 text-left">Name</th>
//             <th className="px-4 py-2 text-left">Email</th>
//             <th className="px-4 py-2 text-left">Role</th>
//             <th className="px-4 py-2 text-left">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user._id} className="bg-white hover:bg-gray-50">
//               <td className="px-4 py-2">
//                 <img
//                   src={user.photoUrl || "/default-avatar.png"} // Default image if no user image
//                   alt={user.name}
//                   className="w-10 h-10 rounded-full object-cover"
//                 />
//               </td>
//               <td className="px-4 py-2">{user.name}</td>
//               <td className="px-4 py-2">{user.email}</td>
//               <td className="px-4 py-2">{user.role}</td>
//               <td className="px-4 py-2">
//                 <button
//                   onClick={() => handleDelete(user._id)}
//                   className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-300"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Users;

import React, { useEffect, useState } from "react";
import { useGetUsersQuery, useDeleteUserMutation } from "@/features/api/authApi"; // Importing delete mutation
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom"; // Import Link for routing

const Users = () => {
  const { data, error, isLoading } = useGetUsersQuery(); // Fetch users
  const [deleteUser] = useDeleteUserMutation(); // For deleting a user
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (data) {
      setUsers(data.users); // Set users when data is available
    }
  }, [data]);

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId); // Call delete mutation
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
