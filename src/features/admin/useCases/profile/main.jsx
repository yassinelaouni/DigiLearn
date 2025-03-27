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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import Fingerprint from '@mui/icons-material/Fingerprint';
import EditIcon from '@mui/icons-material/Edit';

import useProfile from "./service";




export function Profile() {




    const {
        isPhoneEdit,
        showPasswordOld,
        showPasswordNew,
        showPasswordConfirmation,
        password,
        phone,
        canChangePassword,
        canChangePhone,
        isErrors,
        errorsMessages,
        handleChangePassword,
        handleChangePhone,
        showPasswordOldHandler,
        showPasswordNewHandler,
        showPhoneEdit,
        passwordOldMouseDownHandler,
        passwordNewMouseDownHandler,
        showPasswordConfirmationdHandler,
        passwordConfirmationMouseDownHandler,
        handleChangePasswordDispatch,
        handleChangePhoneDispatch

    } = useProfile();


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
                    Admin Information
                </Typography>

                {/* Seller ID */}
                <Grid container justifyContent="flex-start" alignItems="center" style={{ marginTop: '10px', marginLeft: '10px' }}>
                    <Fingerprint />
                    <Typography variant="subtitle1" color="GrayText" style={{ marginLeft: '7px', textAlign: 'left' }}>
                        Admin ID: ysselaui
                    </Typography>
                </Grid>

                {/* Full Name */}
                <Grid container justifyContent="flex-start" alignItems="center" style={{ marginLeft: '10px' }}>
                    <InputBase
                        name="fullName"
                        id="full-name-input"
                        label="Full Name"
                        defaultValue="Hamza LACHQAR"
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
                    <InputBase
                        name="email"
                        id="email-input"
                        defaultValue="lachquarhamza@gmail.com"
                        readOnly
                        startAdornment={
                            <InputAdornment position="start">
                                <EmailIcon />
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
                            Change
                        </Button>
                    )}
                </Grid>
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