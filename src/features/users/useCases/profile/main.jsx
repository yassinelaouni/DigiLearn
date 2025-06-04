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
import useProfileService from "./service";
import Layout from "@/components/layout/Layout";


export default function ProfilePage() {
    const primaryPurple = '#7E66DC';
    const darkPurple = '#5A4AE3';

    const {
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
        handleChangePassword
    } = useProfileService();

    return (
        <Layout>
            <div style={{ backgroundColor: '#f5f5f5', width: '100%', minHeight: '100vh' }}>
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
                    <Card sx={{ width: '100%', borderRadius: 2, boxShadow: 3 }}>
                        <CardContent sx={{ p: 4 }}>
                            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                                Votre Profil
                            </Typography>

                            {/* Avatar Section */}
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
                                <Avatar
                                    src={profile.avatar ? `${profile.avatar}?t=${profile._version || Date.now()}` : null}
                                    sx={{
                                        width: 80,
                                        height: 80,
                                        bgcolor: primaryPurple,
                                        fontSize: '2rem',
                                        mb: 2
                                    }}
                                >
                                    {getInitials()}
                                </Avatar>
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
                                        bgcolor: primaryPurple,
                                        '&:hover': { bgcolor: darkPurple }
                                    }}
                                >
                                    Upload Photo
                                </Button>
                            </Box>

                            <Divider sx={{ my: 3 }} />

                            {/* First Name Field */}
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
                                    First Name
                                </Typography>
                                {editing.firstName ? (
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <TextField
                                            fullWidth
                                            name="firstName"
                                            value={editValues.firstName}
                                            onChange={handleEditChange}
                                            error={!!errors.firstName}
                                            helperText={errors.firstName}
                                        />
                                        <Button
                                            variant="contained"
                                            onClick={() => saveEdit('firstName')}
                                            disabled={!canSave.profile}
                                            sx={{ bgcolor: primaryPurple }}
                                        >
                                            Save
                                        </Button>
                                        <Button variant="outlined" onClick={() => cancelEdit('firstName')}>
                                            Cancel
                                        </Button>
                                    </Box>
                                ) : (
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography>{profile.firstName}</Typography>
                                        <Button
                                            variant="outlined"
                                            onClick={() => startEditing('firstName')}
                                            startIcon={<Edit />}
                                        >
                                            Edit
                                        </Button>
                                    </Box>
                                )}
                            </Box>

                            {/* Last Name Field */}
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
                                    Last Name
                                </Typography>
                                {editing.lastName ? (
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <TextField
                                            fullWidth
                                            name="lastName"
                                            value={editValues.lastName}
                                            onChange={handleEditChange}
                                            error={!!errors.lastName}
                                            helperText={errors.lastName}
                                        />
                                        <Button
                                            variant="contained"
                                            onClick={() => saveEdit('lastName')}
                                            disabled={!canSave.profile}
                                            sx={{ bgcolor: primaryPurple }}
                                        >
                                            Save
                                        </Button>
                                        <Button variant="outlined" onClick={() => cancelEdit('lastName')}>
                                            Cancel
                                        </Button>
                                    </Box>
                                ) : (
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography>{profile.lastName}</Typography>
                                        <Button
                                            variant="outlined"
                                            onClick={() => startEditing('lastName')}
                                            startIcon={<Edit />}
                                        >
                                            Edit
                                        </Button>
                                    </Box>
                                )}
                            </Box>

                            {/* Email Field - Readonly */}
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
                                    Email
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography>{profile.email}</Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>

                    {/* Password Card */}
                    <Card sx={{ width: '100%', borderRadius: 2, boxShadow: 3 }}>
                        <CardContent sx={{ p: 4 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                                Change Password
                            </Typography>

                            {/* Old Password */}
                            <Box sx={{ mb: 3 }}>
                                <TextField
                                    fullWidth
                                    name="old"
                                    label="Current Password"
                                    type={showPasswords.old ? "text" : "password"}
                                    value={password.old}
                                    onChange={handlePasswordChange}
                                    error={!!errors.passwordOld}
                                    helperText={errors.passwordOld}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => togglePasswordVisibility('old')}
                                                    edge="end"
                                                    sx={{ color: '#7E66DC' }}
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
                                        },
                                        '& .MuiInputLabel-root.Mui-focused': {
                                            color: primaryPurple
                                        }
                                    }}
                                />
                            </Box>

                            {/* New Password */}
                            <Box sx={{ mb: 3 }}>
                                <TextField
                                    fullWidth
                                    name="new"
                                    label="New Password"
                                    type={showPasswords.new ? "text" : "password"}
                                    value={password.new}
                                    onChange={handlePasswordChange}
                                    error={!!errors.passwordNew}
                                    helperText={errors.passwordNew}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => togglePasswordVisibility('new')}
                                                    edge="end"
                                                    sx={{ color: '#7E66DC' }}
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
                                        },
                                        '& .MuiInputLabel-root.Mui-focused': {
                                            color: primaryPurple
                                        }
                                    }}
                                />
                            </Box>

                            {/* Confirm Password */}
                            <Box sx={{ mb: 3 }}>
                                <TextField
                                    fullWidth
                                    name="confirmation"
                                    label="Confirm Password"
                                    type={showPasswords.confirmation ? "text" : "password"}
                                    value={password.confirmation}
                                    onChange={handlePasswordChange}
                                    error={!!errors.passwordConfirmation}
                                    helperText={errors.passwordConfirmation}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => togglePasswordVisibility('confirmation')}
                                                    edge="end"
                                                    sx={{ color: '#7E66DC' }}
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
                                        },
                                        '& .MuiInputLabel-root.Mui-focused': {
                                            color: primaryPurple
                                        }
                                    }}
                                />
                            </Box>

                            <Button
                                fullWidth
                                variant="contained"
                                onClick={handleChangePassword}
                                disabled={!canSave.password}
                                sx={{
                                    bgcolor: primaryPurple,
                                    height: 52,
                                    '&:hover': { bgcolor: darkPurple },
                                    '&:disabled': { bgcolor: '#e0e0e0' }
                                }}
                            >
                                Change Password
                            </Button>
                        </CardContent>
                    </Card>
                </Box>
            </div>
        </Layout>
    );
}