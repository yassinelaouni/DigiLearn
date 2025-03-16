import { useState, useEffect } from "react";
import {
    Grid,
    FormControl,
    InputLabel,
    Input,
    InputAdornment,
    IconButton,
    TextField,
    Button,
    Typography,
    FormHelperText,
    InputBase,
    Box,
    CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import Fingerprint from '@mui/icons-material/Fingerprint';
import InsertLinkRoundedIcon from '@mui/icons-material/InsertLinkRounded';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import styles from "./styles"
import actions from "../../actions";
import { useDispatch, useSelector } from "react-redux";


import useProfile from "./service";




export function Profile() {
    const dispatch = useDispatch();

    const {
        isPhoneEdit,
        isWebsiteEdit,
        editingWebsiteId,
        showPasswordOld,
        showPasswordNew,
        showPasswordConfirmation,
        password,
        phone,
        lastName,
        firstName,
        email,
        websites,
        loading,
        canChangePassword,
        canChangePhone,
        canWebsite,
        canChangeWebsite,
        isErrors,
        errorsMessages,
        handleChangePassword,
        handleChangePhone,
        handleAddWebsite,
        handleSaveWebsite,
        handleEditWebsite,
        handleDeleteWebsite,
        handleChangeWebsite,
        showAddWebsiteHandler,
        showPasswordOldHandler,
        showPasswordNewHandler,
        showPhoneEdit,
        showInputField,
        passwordOldMouseDownHandler,
        passwordNewMouseDownHandler,
        showPasswordConfirmationdHandler,
        passwordConfirmationMouseDownHandler,
        handleChangePasswordDispatch,
        handleChangePhoneDispatch,
        handleChangeWebsiteDispatch
    } = useProfile();

    const getContainerStyle = () => {
        const isSmallScreen = window.innerWidth <= 600;
        return {
            display: 'flex',
            marginLeft: '10px',
            flexGrow: 1,
            flexDirection: isSmallScreen ? 'column' : 'row',
        };
    };

    const LoadingScreen = () => {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <CircularProgress />
            </Box>
        );
    };

    if (loading) {
        return <LoadingScreen />;
    }


    return (

        < Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{
                marginTop: '15px',
            }
            }
        >
            {/* User Information */}
            <Grid container justifyContent="flex-start" alignItems="center" style={{
                marginTop: '20px', backgroundColor: 'rgb(225 225 224)',
                borderRadius: 10,
                padding: 25,
                maxWidth: "1020px"
            }} dir="ltr">
                <Typography variant="h5" color="GrayText" style={{ textAlign: 'left' }}>
                    User Information
                </Typography>

                {/* Seller ID */}
                <Grid container justifyContent="flex-start" alignItems="center" style={{ marginTop: '10px', marginLeft: '10px' }}>
                    <Fingerprint />
                    <Typography variant="subtitle1" color="GrayText" style={{ marginLeft: '7px', textAlign: 'left' }}>
                        Seller ID: ysselaui
                    </Typography>
                </Grid>

                {/* Full Name */}
                <Grid container justifyContent="flex-start" alignItems="center" style={{ marginLeft: '10px' }}>
                    <InputBase
                        name="fullName"
                        id="full-name-input"
                        label="Full Name"
                        defaultValue={(firstName + " " + lastName) ?? "loading....."}
                        readOnly
                        startAdornment={
                            <InputAdornment position="start">
                                <PersonRoundedIcon />
                            </InputAdornment>
                        }
                        style={{
                            marginTop: 10,
                            width: 250,
                            marginRight: '80px',
                            textAlign: 'left',
                            textDecoration: 'none',
                            borderBottom: 'none',
                            boxShadow: 'none',
                        }}
                        inputProps={{
                            style: {
                                textDecoration: 'none',
                                borderBottom: 'none',
                                boxShadow: 'none',
                            },
                        }}
                    />
                </Grid>

                {/* Email */}
                <Grid container justifyContent="flex-start" alignItems="center" style={{ marginLeft: '10px' }}>
                    {email ? < InputBase
                        name="email"
                        id="email-input"
                        defaultValue={email}
                        readOnly
                        startAdornment={
                            <InputAdornment position="start">
                                <EmailIcon />
                            </InputAdornment>
                        }
                        style={{
                            marginTop: 10,
                            width: 258,
                            marginRight: '80px',
                            textAlign: 'left',
                            textDecoration: 'none',
                            borderBottom: 'none',
                            boxShadow: 'none',
                        }}
                        inputProps={{
                            style: {
                                textDecoration: 'none',
                                borderBottom: 'none',
                                boxShadow: 'none',
                            },
                        }}
                    /> : <InputBase
                        name="email"
                        id="email-input"
                        defaultValue="looding email"
                        readOnly
                        startAdornment={
                            <InputAdornment position="start">
                                <EmailIcon />
                            </InputAdornment>
                        }
                        style={{
                            marginTop: 10,
                            width: 258,
                            marginRight: '80px',
                            textAlign: 'left',
                            textDecoration: 'none',
                            borderBottom: 'none',
                            boxShadow: 'none',
                        }}
                        inputProps={{
                            style: {
                                textDecoration: 'none',
                                borderBottom: 'none',
                                boxShadow: 'none',
                            },
                        }}
                    />}
                </Grid>

                {/* Phone */}
                <Grid container justifyContent="space-between" alignItems="center" style={{ marginLeft: '10px' }}>
                    {!isPhoneEdit ? (
                        <Grid item>
                            <InputBase
                                name="phone"
                                id="phone-input"
                                defaultValue={phone}
                                readOnly
                                startAdornment={
                                    <InputAdornment position="start">
                                        <CallIcon />
                                    </InputAdornment>
                                }
                                style={{
                                    marginTop: 10,
                                    width: '210px',
                                    textAlign: 'left',
                                    textDecoration: 'none',
                                    borderBottom: 'none',
                                    boxShadow: 'none',
                                }}
                                inputProps={{
                                    style: {
                                        textDecoration: 'none',
                                        borderBottom: 'none',
                                        boxShadow: 'none',
                                    },
                                }}
                            />
                        </Grid>
                    ) : (
                        <Grid item style={{ marginTop: 10 }}>
                            <TextField
                                name="phone"
                                id="phone-input"
                                defaultValue={phone}
                                onChange={handleChangePhone}
                                variant="standard"
                                size="small"
                                style={{ width: '210px', textAlign: 'left' }}
                                error={isErrors.phone}
                                helperText={errorsMessages.phone}
                                InputProps={{
                                    readOnly: !isPhoneEdit,
                                    startAdornment: (
                                        <>
                                            <InputAdornment position="start">
                                                <CallIcon />
                                            </InputAdornment>
                                        </>
                                    ),
                                }}
                            />
                        </Grid>
                    )}
                    {!isPhoneEdit ? (
                        <Button
                            variant="contained"
                            size="small"
                            style={{
                                marginTop: '15px'
                            }}
                            onClick={showPhoneEdit}
                            color="info"
                        >
                            <EditIcon fontSize="small" />
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            size="small"
                            style={{ marginTop: '15px' }}
                            color="success"
                            onClick={handleChangePhoneDispatch}
                            disabled={!canChangePhone}
                        >
                            Save
                        </Button>
                    )}
                </Grid>
            </Grid >

            {/* User Websites */}
            <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                style={{
                    marginTop: '15px',
                    backgroundColor: 'rgb(225 225 224)',
                    borderRadius: 10,
                    padding: 25,
                    maxWidth: "1020px",
                    flexWrap: 'wrap', // Add this line to allow content wrapping

                }}
            >
                <Grid item>
                    <Grid container justifyContent="flex-start" alignItems="center" >
                        <Typography variant="h5" color="GrayText" style={{ textAlign: 'left' }}>
                            User Websites
                        </Typography>
                    </Grid>






































                    {/* Render website components */}
                    {websites.map((website, index) => (
                        <Grid
                            style={getContainerStyle()}
                            key={website.id}
                        >
                            <Grid
                                container
                                item
                            >
                                <Box style={{
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: "flex-start",
                                    alignItems: "center",
                                }}>
                                    {/* Website URL */}
                                    {(isWebsiteEdit && website.id === editingWebsiteId) ? (
                                        <Grid item>
                                            <TextField
                                                name={`website${index + 1}`}
                                                id={`website${index + 1}-input`}
                                                defaultValue={website.url}
                                                onChange={handleChangeWebsite}
                                                error={isErrors.website}
                                                helperText={errorsMessages.website}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <InsertLinkRoundedIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                variant="standard"
                                                size="small"
                                                style={styles.section}
                                            />
                                        </Grid>
                                    ) : (
                                        <Grid item>
                                            <InputBase
                                                name={`website${index + 1}`}
                                                id={`website${index + 1}-input`}
                                                defaultValue={website.url}
                                                readOnly
                                                startAdornment={
                                                    <InputAdornment position="start">
                                                        <InsertLinkRoundedIcon />
                                                    </InputAdornment>
                                                }
                                                style={{
                                                    marginTop: 10,
                                                    width: '238px',
                                                    textAlign: 'left',
                                                    textDecoration: 'none',
                                                    borderBottom: 'none',
                                                    boxShadow: 'none',
                                                }}
                                                inputProps={{
                                                    style: {
                                                        textDecoration: 'none',
                                                        borderBottom: 'none',
                                                        boxShadow: 'none',
                                                    },
                                                }}
                                            />
                                        </Grid>
                                    )}

                                    {/* Status Section */}
                                    <Grid
                                        item
                                        container
                                        alignItems="center"
                                        style={{
                                            marginTop: 10,
                                            display: 'flex',
                                            marginLeft: '2px',
                                        }}
                                    >


                                        {isWebsiteEdit && website.id === editingWebsiteId
                                            ? null
                                            : website.status === "Verified"
                                                ? (
                                                    <Grid item style={{ display: 'flex', flexDirection: 'row', marginLeft: '10px', width: "100px" }}>
                                                        <CheckIcon style={{ color: 'green' }} />
                                                        <Typography variant="body1" style={{ color: 'green', marginLeft: 5 }}>
                                                            Verified
                                                        </Typography>
                                                    </Grid>
                                                )
                                                : website.status === "Inreview"
                                                    ? (
                                                        <Grid item style={{ display: 'flex', flexDirection: 'row', marginLeft: '10px', width: "100px" }}>
                                                            <HourglassBottomIcon style={{ color: 'orange' }} />
                                                            <Typography variant="body1" style={{ color: 'orange', marginLeft: 5 }}>
                                                                Inreview
                                                            </Typography>
                                                        </Grid>
                                                    )
                                                    : (
                                                        <Grid item style={{ display: 'flex', flexDirection: 'row', marginLeft: '10px', width: "100px" }}>
                                                            <CloseIcon style={{ color: 'red' }} />
                                                            <Typography variant="body1" style={{ color: 'red', marginLeft: 5 }}>
                                                                Unverified
                                                            </Typography>
                                                        </Grid>
                                                    )
                                        }
                                    </Grid>
                                </Box>
                            </Grid>

                            {/* Edit and Delete Buttons */}
                            <Grid
                                item
                                container
                                alignItems="center"
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    marginLeft: '10px',
                                    marginTop: '10px', // Add marginTop to separate the buttons from the status
                                }}
                            >

                                {(isWebsiteEdit && website.id === editingWebsiteId) ? (
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            style={{ marginLeft: '15px' }}
                                            color="success"
                                            onClick={handleChangeWebsiteDispatch}
                                            disabled={!canChangeWebsite}
                                        >
                                            Save
                                        </Button>
                                    </Grid>
                                ) : (
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            style={{ marginLeft: '15px' }}
                                            onClick={() => handleEditWebsite(website.id)}
                                            color="info"
                                        >
                                            <EditIcon fontSize="small" />
                                        </Button>
                                    </Grid>
                                )}

                                <Grid item>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        style={{ marginLeft: '15px' }}
                                        onClick={() => handleDeleteWebsite(website.id)}
                                        color="error"
                                    >
                                        <DeleteForeverIcon fontSize="small" />
                                    </Button>
                                </Grid>
                            </Grid>

                        </Grid>
                    ))}

















































                    {/* ////// */}
                </Grid>
                {
                    !(websites.length > 0) ? (<Grid
                        item
                        style={{
                            marginLeft: '10px',
                            marginTop: '15px',
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography variant="h6">No websites found. Add a website</Typography>
                    </Grid>) : null
                }

                {/* Add Button */}
                {
                    showInputField ? (
                        <Grid
                            item
                            container
                            justifyContent="flex-end"
                            alignItems="center"
                            style={{ width: '100%', marginBottom: '14px' }}
                        >
                            <Grid
                                container
                                justifyContent="flex-start"
                                alignItems="center"
                                style={{ marginLeft: '10px', width: '100%' }}
                            >
                                <TextField
                                    name="new-website-input"
                                    id="new-website-input"
                                    label="New website"
                                    onChange={handleAddWebsite}
                                    error={isErrors.website}
                                    helperText={errorsMessages.website}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <InsertLinkRoundedIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant="standard"
                                    size="small"
                                    style={styles.section}
                                />
                            </Grid>
                            <Button
                                variant="contained"
                                size="small"
                                color="success"
                                disabled={!canWebsite}
                                onClick={handleSaveWebsite}>
                                Save
                            </Button>
                        </Grid>
                    ) : (
                        <Grid
                            container
                            justifyContent="flex-end"
                            alignItems="center"
                            style={{ marginTop: '15px' }}
                        >
                            <Button variant="contained" size="small" onClick={showAddWebsiteHandler} color="info">
                                <AddIcon fontSize="small" />
                            </Button>
                        </Grid>
                    )
                }
            </Grid >

            {/** Change Password */}
            < Grid
                container justifyContent="flex-start" alignItems="center" style={{
                    marginTop: '20px', backgroundColor: 'rgb(225 225 224)',
                    borderRadius: 10,
                    padding: 25,
                    maxWidth: "1020px"
                }
                } dir="ltr"
            >

                <Typography variant="h5" color="GrayText" style={{ textAlign: 'left' }}>
                    Change Password
                </Typography>

                {/** Old Password */}
                <Grid
                    container
                    justifyContent="flex-start"
                    alignItems="center"
                    style={{ marginTop: 15, marginLeft: '10px' }}
                >
                    <FormControl sx={{ m: 1, width: 300 }} variant="standard">
                        <InputLabel size="small" htmlFor="password">
                            Old Password
                        </InputLabel>
                        <Input
                            name="old"
                            id="password-old"
                            size="small"
                            value={password.old}
                            onChange={handleChangePassword}
                            type={showPasswordOld ? "text" : "password"}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password confirmation visibility"
                                        onClick={showPasswordOldHandler}
                                        onMouseDown={passwordOldMouseDownHandler}
                                    >
                                        {showPasswordOld ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        {isErrors.passwordOld &&
                            <FormHelperText sx={{ color: "red" }} id="password-confirmation-helper-text">{errorsMessages.passwordOld}</FormHelperText>
                        }
                    </FormControl>
                </Grid>

                {/** New Password */}
                <Grid
                    container
                    justifyContent="flex-start"
                    alignItems="center"
                    style={{ marginTop: 15, marginLeft: '10px' }}
                >
                    <FormControl sx={{ m: 1, width: 300 }} variant="standard">
                        <InputLabel size="small" htmlFor="password">
                            New Password
                        </InputLabel>
                        <Input
                            name="new"
                            id="password-new"
                            size="small"
                            value={password.new}
                            onChange={handleChangePassword}
                            type={showPasswordNew ? "text" : "password"}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password confirmation visibility"
                                        onClick={showPasswordNewHandler}
                                        onMouseDown={passwordNewMouseDownHandler}
                                    >
                                        {showPasswordNew ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        {isErrors.passwordNew &&
                            <FormHelperText sx={{ color: "red" }} id="password-confirmation-helper-text">{errorsMessages.passwordNew}</FormHelperText>
                        }
                    </FormControl>
                </Grid>

                {/** Confirm Password */}
                <Grid
                    container
                    justifyContent="flex-start"
                    alignItems="center"
                    style={{ marginTop: 15, marginLeft: '10px' }}
                >
                    <FormControl sx={{ m: 1, width: 300 }} variant="standard">
                        <InputLabel size="small" htmlFor="password">
                            Confirm Password
                        </InputLabel>
                        <Input
                            name="confirmation"
                            id="password-confirmation"
                            size="small"
                            value={password.confirmation}
                            onChange={handleChangePassword}
                            type={showPasswordConfirmation ? "text" : "password"}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password confirmation visibility"
                                        onClick={showPasswordConfirmationdHandler}
                                        onMouseDown={passwordConfirmationMouseDownHandler}
                                    >
                                        {showPasswordConfirmation ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        {isErrors.passwordConfirmation &&
                            <FormHelperText sx={{ color: "red" }} id="password-confirmation-helper-text">{errorsMessages.passwordConfirmation}</FormHelperText>
                        }
                    </FormControl>
                </Grid>

                {/** Change Password Button */}
                <Grid container
                    justifyContent="flex-start"
                    alignItems="center"
                    style={{ marginTop: 15, marginLeft: '10px' }}
                >
                    <Button
                        variant="contained"
                        size="small"
                        style={{ width: 160, marginTop: '30px' }}
                        color="success"
                        onClick={handleChangePasswordDispatch}
                        disabled={!canChangePassword}
                    >
                        Change Password
                    </Button>
                </Grid>
            </Grid >


        </Grid >
    );
}