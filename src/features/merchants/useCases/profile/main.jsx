import { useState, useRef } from "react";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    IconButton,
    InputAdornment,
    TextField,
    Typography
} from "@mui/material";
import { Edit, Visibility, VisibilityOff, CameraAlt } from "@mui/icons-material";

export default function ProfilePage() {

    const primaryPurple = '#7E66DC';
    const darkPurple = '#5A4AE3';
    const accentYellow = '#F0C441';
    const brandGradient = `linear-gradient(135deg, ${primaryPurple} 0%, ${darkPurple} 100%)`;

    // User data states
    const [profile, setProfile] = useState({
        name: "YASSINE EL AOUNI",
        email: "ya.elaouni@edu.umi.ac.ma",
        avatar: null
    });

    const [editValues, setEditValues] = useState({
        name: profile.name,
        email: profile.email
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

    const [editing, setEditing] = useState({
        name: false,
        email: false
    });

    const fileInputRef = useRef(null);

    // Handle avatar upload
    const handleAvatarUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setProfile({ ...profile, avatar: event.target.result });
            };
            reader.readAsDataURL(file);
        }
    };

    // Trigger file input click
    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    // Get initials for avatar
    const getInitials = () => {
        return profile.name.split(' ').map(n => n[0]).join('');
    };

    // Toggle password visibility
    const togglePasswordVisibility = (field) => {
        setShowPasswords({
            ...showPasswords,
            [field]: !showPasswords[field]
        });
    };

    // Handle edit field changes
    const handleEditChange = (field, value) => {
        setEditValues({
            ...editValues,
            [field]: value
        });
    };

    // Save edited field
    const handleSaveEdit = (field) => {
        setProfile({
            ...profile,
            [field]: editValues[field]
        });
        setEditing({
            ...editing,
            [field]: false
        });
    };

    // Cancel editing
    const handleCancelEdit = (field) => {
        setEditValues({
            ...editValues,
            [field]: profile[field]
        });
        setEditing({
            ...editing,
            [field]: false
        });
    };

    // Start editing a field
    const startEditing = (field) => {
        setEditing({
            ...editing,
            [field]: true
        });
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 3,
            gap: 3,
            maxWidth: 600,
            mx: 'auto'
        }}>
            {/* Profile Card */}
            <Card sx={{
                width: '100%',
                borderRadius: 2,
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)'
            }}>
                <CardContent sx={{ p: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                        Your profile
                    </Typography>

                    {/* Avatar Section */}
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        mb: 4
                    }}>
                        <Avatar
                            src={profile.avatar}
                            sx={{
                                width: 80,
                                height: 80,
                                bgcolor: '#7E66DC',
                                fontSize: '2rem',
                                mb: 2
                            }}
                        >
                            {getInitials()}
                        </Avatar>
                        <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
                            Upload your profile photo
                        </Typography>
                        <input
                            type="file"
                            ref={fileInputRef}
                            hidden
                            accept="image/*"
                            onChange={handleAvatarUpload}
                        />
                        <Button
                            variant="contained"
                            onClick={triggerFileInput}
                            startIcon={<CameraAlt />}
                            sx={{
                                textTransform: 'none',
                                borderRadius: 1,
                                px: 3,
                                py: 1,
                                bgcolor: '#7E66DC',
                                '&:hover': {
                                    bgcolor: '#5A4AE3'
                                }
                            }}
                        >
                            Upload photo
                        </Button>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    {/* Name Field */}
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" sx={{
                            mb: 1,
                            color: 'text.secondary',
                            fontWeight: 500
                        }}>
                            Name
                        </Typography>
                        {editing.name ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <TextField
                                    fullWidth
                                    value={editValues.name}
                                    onChange={(e) => handleEditChange('name', e.target.value)}
                                    variant="outlined"
                                    size="small"
                                />
                                <Button
                                    variant="contained"
                                    onClick={() => handleSaveEdit('name')}
                                    sx={{
                                        bgcolor: '#7E66DC',
                                        '&:hover': { bgcolor: '#5A4AE3' }
                                    }}
                                >
                                    Save
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={() => handleCancelEdit('name')}
                                >
                                    Cancel
                                </Button>
                            </Box>
                        ) : (
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography variant="body1">
                                    {profile.name}
                                </Typography>
                                <Button
                                    variant="outlined"
                                    onClick={() => startEditing('name')}
                                    startIcon={<Edit />}
                                >
                                    Edit
                                </Button>
                            </Box>
                        )}
                    </Box>

                    {/* Email Field */}
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{
                            mb: 1,
                            color: 'text.secondary',
                            fontWeight: 500
                        }}>
                            Email address
                        </Typography>
                        {editing.email ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <TextField
                                    fullWidth
                                    value={editValues.email}
                                    onChange={(e) => handleEditChange('email', e.target.value)}
                                    variant="outlined"
                                    size="small"
                                />
                                <Button
                                    variant="contained"
                                    onClick={() => handleSaveEdit('email')}
                                    sx={{
                                        bgcolor: '#7E66DC',
                                        '&:hover': { bgcolor: '#5A4AE3' }
                                    }}
                                >
                                    Save
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={() => handleCancelEdit('email')}
                                >
                                    Cancel
                                </Button>
                            </Box>
                        ) : (
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography variant="body1">
                                    {profile.email}
                                </Typography>
                                <Button
                                    variant="outlined"
                                    onClick={() => startEditing('email')}
                                    startIcon={<Edit />}
                                >
                                    Edit
                                </Button>
                            </Box>
                        )}
                    </Box>
                </CardContent>
            </Card>

            {/* Change Password Card */}
            <Card sx={{
                width: '100%',
                borderRadius: 2,
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)'
            }}>
                <CardContent sx={{ p: 4 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                        Change Password
                    </Typography>

                    {/* Old Password */}
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" sx={{
                            mb: 1,
                            color: 'text.secondary',
                            fontWeight: 500
                        }}>
                            Old Password
                        </Typography>
                        <TextField
                            fullWidth
                            value={password.old}
                            onChange={(e) => setPassword({ ...password, old: e.target.value })}
                            type={showPasswords.old ? "text" : "password"}
                            variant="outlined"
                            size="small"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => togglePasswordVisibility('old')}
                                            edge="end"
                                        >
                                            {showPasswords.old ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    '&:hover fieldset': {
                                        borderColor: primaryPurple
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: primaryPurple
                                    }
                                }
                            }}
                        />
                    </Box>

                    {/* New Password */}
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" sx={{
                            mb: 1,
                            color: 'text.secondary',
                            fontWeight: 500
                        }}>
                            New Password
                        </Typography>
                        <TextField
                            fullWidth
                            value={password.new}
                            onChange={(e) => setPassword({ ...password, new: e.target.value })}
                            type={showPasswords.new ? "text" : "password"}
                            variant="outlined"
                            size="small"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => togglePasswordVisibility('new')}
                                            edge="end"
                                        >
                                            {showPasswords.new ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    '&:hover fieldset': {
                                        borderColor: primaryPurple
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: primaryPurple
                                    }
                                }
                            }}
                        />
                    </Box>

                    {/* Confirm Password */}
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" sx={{
                            mb: 1,
                            color: 'text.secondary',
                            fontWeight: 500
                        }}>
                            Confirm Password
                        </Typography>
                        <TextField
                            fullWidth
                            value={password.confirmation}
                            onChange={(e) => setPassword({ ...password, confirmation: e.target.value })}
                            type={showPasswords.confirmation ? "text" : "password"}
                            variant="outlined"
                            size="small"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => togglePasswordVisibility('confirmation')}
                                            edge="end"
                                        >
                                            {showPasswords.confirmation ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    '&:hover fieldset': {
                                        borderColor: primaryPurple
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: primaryPurple
                                    }
                                }
                            }}
                        />
                    </Box>

                    <Button
                        fullWidth
                        variant="contained"
                        sx={{
                            bgcolor: '#7E66DC',
                            py: 1.5,
                            borderRadius: 1,
                            fontWeight: 600,
                            textTransform: 'none',
                            '&:hover': {
                                bgcolor: '#5A4AE3'
                            }
                        }}
                    >
                        Change Password
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
}