import React, { useEffect, useState } from "react";
import { Edit, Save, X } from "lucide-react";
import axios from "axios";
import { useAdminAuth } from "../../contexts/AdminAuthContext";
import toast from "react-hot-toast";
import axiosInstance from "../../api/axiosInstance";

const ProfilePage = () => {
  const { adminInfo, setAdminInfo, setShowLogoutDialog } = useAdminAuth();
  const [adminData, setAdminData] = useState({ name: "", email: "" });
  const [editMode, setEditMode] = useState(false);

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    passwordMismatch: "",
    incorrectPassword: "",
    serverError: "",
  });

  useEffect(() => {
    if (adminInfo) {
      setAdminData(adminInfo);
      setFormState((prev) => ({
        ...prev,
        name: adminInfo.name,
        email: adminInfo.email,
      }));
    }
  }, [adminInfo]);

  const handleInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    setErrors({ passwordMismatch: "", incorrectPassword: "", serverError: "" });
  };

  const handleCancel = () => {
    setEditMode(false);
    setFormState({
      name: adminData.name,
      email: adminData.email,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setErrors({ passwordMismatch: "", incorrectPassword: "", serverError: "" });
  };

  const handleSave = async () => {
    if (!formState.currentPassword) {
      setErrors((prev) => ({ ...prev, incorrectPassword: "Current password is required" }));
      return;
    }

    if ((formState.newPassword || formState.confirmPassword) && formState.newPassword !== formState.confirmPassword) {
      setErrors((prev) => ({ ...prev, passwordMismatch: "New passwords do not match" }));
      return;
    }

    try {
      const res = await axiosInstance.patch("/update-profile",{
        name: formState.name,
        email: formState.email,
        currentPassword: formState.currentPassword,
        newPassword: formState.newPassword || undefined,
      });

      setAdminData({ name: res.data.name, email: res.data.email });
      setAdminInfo({ name: res.data.name, email: res.data.email });

      handleCancel()

      toast.success("Profile updated");
      
    } catch (err) {
      const msg = err?.response?.data?.message || "Something went wrong";
      if (msg.includes("Incorrect")) {
        setErrors((prev) => ({ ...prev, incorrectPassword: msg }));
      } else {
        setErrors((prev) => ({ ...prev, serverError: msg }));
      }
    }
  };

  return (
    <div className="w-full">
      <div className="w-full max-w-[72rem] mx-auto bg-white rounded-[0.75rem] shadow-[0_0_1rem_rgba(0,0,0,0.05)] p-[2rem] border border-[#FDE68A]">
        <div className="flex items-center justify-between mb-[1.5rem]">
          <div>
            <h2 className="text-[1.75rem] font-bold text-[#1F2937]">Admin Profile</h2>
            <p className="text-[1rem] text-[#6B7280] mt-[0.25rem]">Manage your account details securely</p>
          </div>
          {!editMode && (
            <button
              onClick={() => setEditMode(true)}
              className="flex items-center gap-[0.5rem] bg-[#F97316] hover:bg-[#ea580c] text-white px-[1.25rem] py-[0.625rem] text-[0.875rem] rounded-[0.375rem] shadow-[0_0.25rem_0.5rem_rgba(249,115,22,0.4)]"
            >
              <Edit className="w-[1rem] h-[1rem]" />
              Edit Profile
            </button>
          )}
        </div>
        {errors.serverError && <p className="text-[0.875rem] text-red-600 mb-[1rem]">{errors.serverError}</p>}

        <form className="grid grid-cols-1 md:grid-cols-2 gap-[1.5rem]">
          <div className="col-span-1">
            <label className="block text-[0.875rem] font-medium text-[#374151] mb-[0.5rem]">Name</label>
            <input
              type="text"
              name="name"
              value={formState.name}
              onChange={handleInputChange}
              disabled={!editMode}
              className="w-full px-[1rem] py-[0.625rem] text-[1rem] border border-[#D1D5DB] rounded-[0.375rem] bg-white focus:outline-none focus:ring-[0.125rem] focus:ring-[#F97316]"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-[0.875rem] font-medium text-[#374151] mb-[0.5rem]">Email</label>
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleInputChange}
              disabled={!editMode}
              className="w-full px-[1rem] py-[0.625rem] text-[1rem] border border-[#D1D5DB] rounded-[0.375rem] bg-white focus:outline-none focus:ring-[0.125rem] focus:ring-[#F97316]"
            />
          </div>

          {editMode && (
            <>
              <div className="col-span-1">
                <label className="block text-[0.875rem] font-medium text-[#374151] mb-[0.5rem]">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={formState.currentPassword}
                  onChange={handleInputChange}
                  className="w-full px-[1rem] py-[0.625rem] text-[1rem] border border-[#D1D5DB] rounded-[0.375rem]"
                />
                {errors.incorrectPassword && (
                  <p className="text-[0.75rem] text-red-600 mt-[0.25rem]">{errors.incorrectPassword}</p>
                )}
              </div>

              <div className="col-span-1">
                <label className="block text-[0.875rem] font-medium text-[#374151] mb-[0.5rem]">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={formState.newPassword}
                  onChange={handleInputChange}
                  className="w-full px-[1rem] py-[0.625rem] text-[1rem] border border-[#D1D5DB] rounded-[0.375rem]"
                />
              </div>

              <div className="col-span-1">
                <label className="block text-[0.875rem] font-medium text-[#374151] mb-[0.5rem]">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formState.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-[1rem] py-[0.625rem] text-[1rem] border border-[#D1D5DB] rounded-[0.375rem]"
                />
                {errors.passwordMismatch && (
                  <p className="text-[0.75rem] text-red-600 mt-[0.25rem]">{errors.passwordMismatch}</p>
                )}
              </div>
            </>
          )}
        </form>

        {editMode && (
          <div className="flex justify-end gap-[1rem] mt-[2rem]">
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center gap-2 px-[0.9375rem] py-[0.4688rem] bg-[#F3F4F6] text-[#374151] rounded-[0.375rem] text-[0.875rem]"
            >
              <X className="w-[1.25rem] h-[1.25rem]" />
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-2 h-[2.3438rem] px-[0.9375rem] py-[0.4688rem] bg-green-600 hover:bg-green-700 text-white rounded-md text-[0.8203rem] font-medium"
            >
              <Save className="w-[1rem] h-[1rem] mr-2" />
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
