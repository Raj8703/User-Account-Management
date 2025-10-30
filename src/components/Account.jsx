import React, { useState } from "react";
import { motion } from "framer-motion";

const Account = ({ user, setUser }) => {
  const [formData, setFormData] = useState(user);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.email === user.email ? formData : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("loggedInUser", JSON.stringify(formData));
    setUser(formData);
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0].toUpperCase())
        .join("")
    : "U";

  return (
    <motion.div
      className="bg-white p-8 rounded-2xl shadow-lg w-[420px] mx-auto border border-gray-100"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col items-center mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white w-20 h-20 flex items-center justify-center rounded-full text-2xl font-bold shadow-md">
          {initials}
        </div>
        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          {user.name}
        </h2>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-600">Full Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none ${
              isEditing
                ? "border-blue-400 focus:ring-2 focus:ring-blue-200"
                : "border-gray-200 bg-gray-100 text-gray-600"
            }`}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-600">
            Email Address
          </label>
          <input
            name="email"
            value={formData.email}
            disabled
            className="w-full mt-1 border border-gray-200 bg-gray-100 rounded-lg px-3 py-2 text-gray-600"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-600">Password</label>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full mt-1 border rounded-lg px-3 py-2 pr-10 focus:outline-none ${
                isEditing
                  ? "border-blue-400 focus:ring-2 focus:ring-blue-200"
                  : "border-gray-200 bg-gray-100 text-gray-600"
              }`}
            />
            {isEditing && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-500 text-sm font-medium"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition"
            >
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded-lg transition"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Edit Profile
          </button>
        )}
      </div>

      <p className="text-xs text-center text-gray-400 mt-6">
        Last updated:{" "}
        <span className="font-medium">{new Date().toLocaleDateString()}</span>
      </p>
    </motion.div>
  );
};

export default Account;
