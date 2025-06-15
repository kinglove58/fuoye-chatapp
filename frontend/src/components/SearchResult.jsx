import React from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";

const SearchResult = () => {
  const {
    getUsers,
    searchValue,
    setSearchValue,
    users,
    selectedUser,
    setSelectedUser,
    isUsersLoading,
  } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const search_result = searchValue
    ? users.filter((user) =>
        user.username.toLowerCase().includes(searchValue.toLowerCase())
      )
    : [];

  return (
    <div className="">
      {search_result.length === 0 && (
        <div className="text-center text-zinc-500 py-4">
          No matching users found
        </div>
      )}

      <div className="overflow-y-auto w-full py-3">
        {search_result.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${
                selectedUser?._id === user._id
                  ? "bg-base-300 ring-1 ring-base-300"
                  : ""
              }
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
