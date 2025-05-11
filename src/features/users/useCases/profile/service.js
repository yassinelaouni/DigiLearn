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
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        // Get userId from URL params, localStorage, or props
        const userId = '68152e9b92f42938445d56d0'; // Replace with your actual userId source
        
        const response = await fetch(`${API_BASE_URL}/users/${userId}/profile`, {
          headers: { 
            'Content-Type': 'application/json'
          }
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
          setProfile(data.user);
          setEditValues(data.user);
        } else {
          console.error("Failed to fetch profile:", data.errorMessage);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setIsLoading(false);
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
      passwordOld: !helpers.validator.isEmptyString(password.old) 
        ? (helpers.validator.isPassword(password.old) ? null : "Enter current password")
        : null,
      passwordNew: !helpers.validator.isEmptyString(password.new) 
        ? (helpers.validator.isPassword(password.new) ? null : "Password must be 8+ chars with special characters")
        : null,
      passwordConfirmation: !helpers.validator.isEmptyString(password.confirmation) 
        ? (helpers.validator.isPasswordMatch({
            password: password.new,
            confirmPassword: password.confirmation
          }) ? null : "Passwords don't match")
        : null
    });
  }, [editValues, password, profile]);

    // Update profile field (firstName/lastName)
    const updateProfileField = async (field, value) => {
      try {
        setIsLoading(true);
        const token = Cookies.get('token');
        const userId = profile.id; // Use the profile ID we already have
        const endpoint = field === 'firstName' ? 'firstName' : 'lastName';
        
        const response = await fetch(`${API_BASE_URL}/users/${userId}/update/${endpoint}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ [field]: value })
        });
        
        const data = await response.json();
        
        if (data.success) {
          setProfile(prev => ({ ...prev, [field]: value }));
          return true;
        } else {
          console.error(`Failed to update ${field}:`, data.errorMessage);
          return false;
        }
      } catch (error) {
        console.error(`Failed to update ${field}:`, error);
        return false;
      } finally {
        setIsLoading(false);
      }
    };
    
    const handleAvatarUpload = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
    
      try {
        setIsLoading(true);
        const token = Cookies.get('token');
        const userId = profile.id;
        const formData = new FormData();
        formData.append('avatar', file);
    
        const response = await fetch(`${API_BASE_URL}/users/${userId}/update/avatar`, {
          method: 'PATCH',
          headers: { 
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });
    
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || 'Upload failed');
        }
    
        const data = await response.json();
        
        if (data.success) {
          // Force complete state refresh by creating a new object
          setProfile(prev => ({
            ...prev,
            avatar: data.updated.avatar,
            // Add a random key to force re-render
            _version: Date.now()
          }));
          return true;
        } else {
          throw new Error(data.errorMessage || 'Upload failed');
        }
      } catch (error) {
        console.error("Upload error:", error);
        return false;
      } finally {
        setIsLoading(false);
      }
    };

  // Update password
  const handleChangePassword = async () => {
    if (!canSave.password) return false;

    try {
      setIsLoading(true);
      const token = Cookies.get('token');
      const userId = profile.id;
      
      const response = await fetch(`${API_BASE_URL}/users/${userId}/update/password`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: password.old,
          newPassword: password.new
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setPassword({ old: "", new: "", confirmation: "" });
        return true;
      } else {
        console.error("Failed to change password:", data.errorMessage);
        return false;
      }
    } catch (error) {
      console.error("Failed to change password:", error);
      return false;
    } finally {
      setIsLoading(false);
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
      setEditing(prev => ({ ...prev, [field]: false }));
    }
    return success;
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
    Cookies.remove('token');
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
    isLoading,
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