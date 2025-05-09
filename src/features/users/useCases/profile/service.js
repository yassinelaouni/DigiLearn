import { useState, useRef, useEffect } from "react";
import Cookies from 'js-cookie';
import helpers from "../../../../helpers";

const API_BASE_URL = "http://localhost:5000/api";
const STORAGE_KEYS = {
  PROFILE: 'userProfile',
  AVATAR: 'userAvatar'
};

export default function useProfileService() {
  const [profile, setProfile] = useState({
    id: '',
    firstName: '',
    lastName: '', 
    email: '',
    avatar: null,
    balance: 0,
    role: 'student'
  });

  const [editValues, setEditValues] = useState({ ...profile });
  const [editing, setEditing] = useState({ firstName: false, lastName: false });
  const [password, setPassword] = useState({ old: "", new: "", confirmation: "" });
  const [showPasswords, setShowPasswords] = useState({ old: false, new: false, confirmation: false });
  const [errors, setErrors] = useState({
    firstName: null,
    lastName: null,
    passwordOld: null,
    passwordNew: null,
    passwordConfirmation: null
  });
  const [canSave, setCanSave] = useState({ profile: false, password: false });
  const fileInputRef = useRef(null);

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MTUyZTliOTJmNDI5Mzg0NDVkNTZkMCIsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNzQ2ODE4MTMzLCJleHAiOjE3NDk0MTAxMzN9.Th_BOvtwEgpxNYhVBDMGfpFqK0jF58NGr_JJoijmLaI";
        const response = await fetch(`${API_BASE_URL}/users/get/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        if (response.ok && data.success) {
          setProfile(data.user);
          setEditValues(data.user); // Initialize edit values
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };
    fetchProfile();
  }, []);

  // Field validation
  useEffect(() => {
    const profileValid = (
      helpers.validator.isName(editValues.firstName) &&
      helpers.validator.isName(editValues.lastName) &&
      (editValues.firstName !== profile.firstName ||
       editValues.lastName !== profile.lastName)
    );

    const passwordValid = (
      !helpers.validator.isEmptyString(password.old) &&
      helpers.validator.isPassword(password.new) &&
      helpers.validator.isPasswordMatch({
        password: password.new,
        confirmPassword: password.confirmation
      })
    );

    setCanSave({ profile: profileValid, password: passwordValid });

    setErrors({
      firstName: helpers.validator.isName(editValues.firstName) ? null : "Invalid first name",
      lastName: helpers.validator.isName(editValues.lastName) ? null : "Invalid last name",
      passwordOld: !helpers.validator.isEmptyString(password.old) ? null : "Enter current password",
      passwordNew: helpers.validator.isPassword(password.new) ? null : "Password must be 8+ chars with special characters",
      passwordConfirmation: helpers.validator.isPasswordMatch({
        password: password.new,
        confirmPassword: password.confirmation
      }) ? null : "Passwords don't match"
    });
  }, [editValues, password, profile]);

  // API: Update profile field (firstName/lastName)
  const updateProfileField = async (field, value) => {
    try {
      const token = Cookies.get('token');
      const endpoint = field === 'firstName' ? 'firstName' : 'lastName';
      const response = await fetch(`${API_BASE_URL}/users/update/${endpoint}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ [field]: value })
      });
      
      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error(`Failed to update ${field}:`, error);
      return false;
    }
  };

  // API: Upload avatar
  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const token = Cookies.get('token');
      const response = await fetch(`${API_BASE_URL}/users/update/avatar`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      
      const data = await response.json();
      if (data.success) {
        setProfile(prev => ({ ...prev, avatar: data.updated.avatar }));
      }
    } catch (error) {
      console.error("Failed to upload avatar:", error);
    }
  };

  // API: Change password
  const handleChangePassword = async () => {
    if (!canSave.password) return;

    try {
      const token = Cookies.get('token');
      const response = await fetch(`${API_BASE_URL}/users/update/password`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: password.old,
          newPassword: password.new
        })
      });
      
      const data = await response.json();
      if (data.success) {
        setPassword({ old: "", new: "", confirmation: "" });
        alert("Password updated successfully!");
        return true;
      } else {
        alert(data.errorMessage || "Failed to update password");
        return false;
      }
    } catch (error) {
      console.error("Failed to change password:", error);
      alert("An error occurred while updating password");
      return false;
    }
  };

  // Edit handlers
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditValues(prev => ({ ...prev, [name]: value }));
  };

  const startEditing = (field) => {
    setEditing(prev => ({ ...prev, [field]: true }));
  };

  const saveEdit = async (field) => {
    const success = await updateProfileField(field, editValues[field]);
    if (success) {
      setProfile(prev => ({ ...prev, [field]: editValues[field] }));
      setEditing(prev => ({ ...prev, [field]: false }));
      return true;
    }
    return false;
  };

  const cancelEdit = (field) => {
    setEditValues(prev => ({ ...prev, [field]: profile[field] }));
    setEditing(prev => ({ ...prev, [field]: false }));
  };

  // Password handlers
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword(prev => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  // Helpers
  const getInitials = () => {
    return `${profile.firstName?.[0] || ''}${profile.lastName?.[0] || ''}`.toUpperCase();
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  const cleanupStorage = () => {
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    localStorage.removeItem(STORAGE_KEYS.AVATAR);
    Cookies.remove(STORAGE_KEYS.PROFILE);
  };

  return {
    profile,
    editValues,
    editing,
    password,
    showPasswords,
    fileInputRef,
    canSave,
    errors,
    getInitials,
    handleAvatarUpload,
    triggerFileInput,
    togglePasswordVisibility,
    handleEditChange,
    startEditing,
    saveEdit,
    cancelEdit,
    handlePasswordChange,
    handleChangePassword,
    cleanupStorage
  };
}