import { useState } from "react"
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
  FormHelperText
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";


import useRegister from "./service";
import styles from "./styles"

export default function Register() {
  const {
    showPassword,
    showPasswordConfirmation,
    data,
    canRegister,
    isErrors,
    errorsMessages,
    handleChange,
    showPasswordHandler,
    passwordMouseDownHandler,
    handleRegister,
    showPassworConfirmationdHandler,
    passwordConfirmationMouseDownHandler,
    gotoLoginPage
  } = useRegister();





  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
    >
      {/** navigate to login action */}
      <Grid container justifyContent="center" alignItems="center" style={styles.actionsContainer}>
        <Typography variant="caption" color="GrayText">
          You already have an account ?
        </Typography>
        <Button variant="text" color="info" size="small" style={{ marginLeft: 20 }} onClick={gotoLoginPage}>
          login
        </Button>
      </Grid>

      {/** email input */}
      <Grid container justifyContent="center" alignItems="center">
        <TextField
          name="email"
          id="email-input"
          label="Email"
          variant="standard"
          size="small"
          value={data.email}
          onChange={handleChange}
          style={styles.section}
          error={isErrors.email}
          helperText={errorsMessages.email}
        />
      </Grid>

      {/** first name input */}
      <Grid container justifyContent="center" alignItems="center">
        <TextField
          name="firstName"
          id="first-name-input"
          label="First name"
          variant="standard"
          size="small"
          value={data.firstName}
          onChange={handleChange}
          style={styles.section}
          error={isErrors.firstName}
          helperText={errorsMessages.firstName}
        />
      </Grid>
      {/** last name input */}
      <Grid container justifyContent="center" alignItems="center">
        <TextField
          name="lastName"
          id="last-name-input"
          label="Last name"
          variant="standard"
          size="small"
          value={data.lastName}
          onChange={handleChange}
          style={styles.section}
          error={isErrors.lastName}
          helperText={errorsMessages.lastName}
        />
      </Grid>
      {/** phone input */}
      <Grid container justifyContent="center" alignItems="center">
        <TextField
          name="phone"
          id="phone-input"
          label="Phone"
          variant="standard"
          size="small"
          placeholder="+212 --- --- ---"
          value={data.phone}
          onChange={handleChange}
          style={styles.section}
          error={isErrors.phone}
          helperText={errorsMessages.phone}
        />
      </Grid>

      {/** password input */}
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ marginTop: 15 }}
      >
        <FormControl sx={{ m: 1, width: 300 }} variant="standard">
          <InputLabel
            style={isErrors.password ? { color: 'red' } : {}}
            size="small"
            htmlFor="password"
          >
            Password
          </InputLabel>
          <Input
            name="password"
            id="password"
            size="small"
            value={data.password}
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
            error={isErrors.password}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={showPasswordHandler}
                  onMouseDown={passwordMouseDownHandler}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {isErrors.password &&
            <FormHelperText sx={{ color: "red" }} id="password-helper-text">{errorsMessages.password}</FormHelperText>
          }
        </FormControl>
      </Grid>
      {/** password confirmation input */}
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ marginTop: 15 }}
      >
        <FormControl sx={{ m: 1, width: 300 }} variant="standard">
          <InputLabel
            style={isErrors.passwordConfirmation ? { color: 'red' } : {}}
            size="small"
            htmlFor="password"
          >
            Confirm Password
          </InputLabel>
          <Input
            name="passwordConfirmation"
            id="password-confirmation"
            size="small"
            value={data.passwordConfirmation}
            onChange={handleChange}
            type={showPasswordConfirmation ? "text" : "password"}
            error={isErrors.passwordConfirmation}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password confirmation visibility"
                  onClick={showPassworConfirmationdHandler}
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


      {/** register action */}
      {
        canRegister && <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={styles.actionsContainer}
        >
          <Button
            variant="contained"
            size="small"
            style={{ width: 200 }}
            onClick={handleRegister}
            color="info"
          >
            Register
          </Button>
        </Grid>
      }
    </Grid >
  );
}
