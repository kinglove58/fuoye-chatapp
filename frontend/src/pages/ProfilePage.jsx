import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [fullName, setFullName] = useState(authUser?.fullName || "");
const [email, setEmail] = useState(authUser?.email || "");

const handleUpdateProfile = async (e) => {
  e.preventDefault();

  const updatePayload = { fullName, email };
  if (selectedImg) updatePayload.profilePic = selectedImg;

  await updateProfile(updatePayload);
};


  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* avatar upload section */}

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 "
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          <form onSubmit={handleUpdateProfile} className="space-y-6">
            <div className="space-y-1.5">
                <label className="text-sm text-zinc-400">Full Name</label>
                <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-base-200 rounded-lg border"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
            </div>

            <div className="space-y-1.5">
                <label className="text-sm text-zinc-400">Email</label>
                <input
                    type="email"
                    className="w-full px-4 py-2.5 bg-base-200 rounded-lg border"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <button
                type="submit"
                disabled={isUpdatingProfile}
                className={`w-full py-2 px-4 bg-primary text-white rounded-lg hover:opacity-90 transition ${
                isUpdatingProfile ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
                {isUpdatingProfile ? "Updating..." : "Update Profile"}
            </button>
        </form>


          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium  mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
