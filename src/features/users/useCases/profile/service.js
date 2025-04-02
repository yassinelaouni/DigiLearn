import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from 'js-cookie';
import selectAuthUser from "../../../../features/auth/selectors/user";
import actions from "../../../../features/auth/actions";
import helpers from "../../../../helpers";

const STORAGE_KEYS = {
  PROFILE: 'userProfile',
  AVATAR: 'userAvatar'
}; 

export default function useProfileService() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectAuthUser);

  // Debug current user data
  useEffect(() => {
    console.log("Current User from Redux:", currentUser);
  }, [currentUser]);

  // Initialize state from storage or Redux with proper email handling
  const getInitialState = () => {
    try {
      // Try localStorage first
      const localStorageProfile = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (localStorageProfile) {
        const parsed = JSON.parse(localStorageProfile);
        console.log("Loaded from localStorage:", parsed);
        return parsed;
      }

      // Fallback to cookies
      const cookieProfile = Cookies.get(STORAGE_KEYS.PROFILE);
      if (cookieProfile) {
        const parsed = JSON.parse(cookieProfile);
        console.log("Loaded from cookies:", parsed);
        return parsed;
      }

      // Final fallback to Redux with proper email handling
      const initialState = {
        id: currentUser?.id || '',
        firstName: currentUser?.firstName || '',
        lastName: currentUser?.lastName || '',
        email: currentUser?.email || '', // Important: Empty string as default
        avatar: currentUser?.avatar || null
      };
      console.log("Created initial state:", initialState);
      return initialState;

    } catch (error) {
      console.error('Error loading profile data:', error);
      return {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        avatar: null,
      };
    }
  };

  // State declarations
  const [profile, setProfile] = useState(getInitialState());
  const [editValues, setEditValues] = useState({ ...profile });
  const [editing, setEditing] = useState({
    firstName: false,
    lastName: false,
  });
  const [password, setPassword] = useState({
    old: "",
    new: "",
    confirmation: ""
  });
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirmation: false
  });
  const [errors, setErrors] = useState({
    firstName: null,
    lastName: null,
    passwordOld: null,
    passwordNew: null,
    passwordConfirmation: null
  });
  const [canSave, setCanSave] = useState({
    profile: false,
    password: false
  });

  const fileInputRef = useRef(null);

  // Enhanced profile persistence with email handling
  useEffect(() => {
    if (!profile.id) {
      console.log("Skipping profile save - no user ID");
      return;
    }

    try {
      console.log("Saving profile:", profile);
      const profileData = JSON.stringify(profile);
      localStorage.setItem(STORAGE_KEYS.PROFILE, profileData);
      Cookies.set(STORAGE_KEYS.PROFILE, profileData, {
        expires: 7,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });

      if (profile.avatar) {
        localStorage.setItem(STORAGE_KEYS.AVATAR, profile.avatar);
      }
    } catch (error) {
      console.error('Error saving profile data:', error);
    }
  }, [profile]);

  // Enhanced Redux sync with email verification
  useEffect(() => {
    if (currentUser?.id) {
      console.log("Syncing with Redux user data:", currentUser);
      
      if (!currentUser.email) {
        console.warn("Email missing from currentUser!");
      }

      setProfile(prev => {
        // Only update if something actually changed
        if (currentUser.id !== prev.id || 
            currentUser.firstName !== prev.firstName ||
            currentUser.lastName !== prev.lastName ||
            currentUser.email !== prev.email ||
            currentUser.avatar !== prev.avatar) {
          return {
            id: currentUser.id,
            firstName: currentUser.firstName || prev.firstName,
            lastName: currentUser.lastName || prev.lastName,
            email: currentUser.email || prev.email || '', // Proper email fallback
            avatar: currentUser.avatar || prev.avatar
          };
        }
        return prev;
      });
    }
  }, [currentUser]);

  // Validation effect (unchanged)
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
      passwordOld: (!helpers.validator.isEmptyString(password.old) &&
        !helpers.validator.isPassword(password.old)) ? "Enter current password" : null,
      passwordNew: (!helpers.validator.isEmptyString(password.new) &&
        !helpers.validator.isPassword(password.new)) ? "Password must be at least 8 characters" : null,
      passwordConfirmation: (!helpers.validator.isEmptyString(password.new) &&
        !helpers.validator.isPasswordMatch({
          password: password.new,
          confirmPassword: password.confirmation
        })) ? "Passwords don't match" : null
    });
  }, [editValues, password, profile]);

  // Avatar handling (unchanged)
  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newAvatar = event.target.result;
        const newProfile = { ...profile, avatar: newAvatar };
        setProfile(newProfile);
        dispatch(actions.changeAvatar({ userId: profile.id, avatar: newAvatar }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Edit functions (unchanged)
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditValues(prev => ({ ...prev, [name]: value }));
  };

  const startEditing = (field) => {
    setEditing(prev => ({ ...prev, [field]: true }));
  };

  const saveEdit = (field) => {
    const updates = { [field]: editValues[field] };
    const newProfile = { ...profile, ...updates };

    setProfile(newProfile);
    setEditing(prev => ({ ...prev, [field]: false }));

    if (field === 'firstName') {
      dispatch(actions.changeFirstName({
        userId: profile.id,
        firstName: updates[field]
      }));
    } else if (field === 'lastName') {
      dispatch(actions.changeLastName({
        userId: profile.id,
        lastName: updates[field]
      }));
    }
  };

  const cancelEdit = (field) => {
    setEditValues(prev => ({ ...prev, [field]: profile[field] }));
    setEditing(prev => ({ ...prev, [field]: false }));
  };

  // Password functions (unchanged)
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword(prev => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChangePassword = () => {
    if (canSave.password) {
      dispatch(actions.changePassword({
        userId: profile.id,
        oldPassword: password.old,
        newPassword: password.new
      }));
      setPassword({ old: "", new: "", confirmation: "" });
    }
  };

  // Helper functions
  const getInitials = () => {
    return `${profile.firstName?.[0] || ''}${profile.lastName?.[0] || ''}`.toUpperCase();
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  const cleanupStorage = () => {
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    localStorage.removeItem(STORAGE_KEYS.AVATAR);
    Cookies.remove(STORAGE_KEYS.PROFILE);
  };

  // Cleanup effect
  useEffect(() => {
    return () => {
      dispatch(errors.actions.cleaned());
    };
  }, [dispatch]);

  // Debug current profile state
  useEffect(() => {
    console.log("Current profile state:", profile);
  }, [profile]);

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