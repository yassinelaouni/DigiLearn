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

import useLogin from "./service";
import styles from "./styles";

export default function Login() {
  const {
    showPassword,
    handleChange,
    handleClickShowPassword,
    handleMouseDownPassword,
    data,
    canLogin,
    isErrors,
    errorsMessages,
    handleLogin,
    gotoRegisterPage,
    gotoForgotPasswordPage
  } = useLogin();

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
    >
        {/** navigate to register action */}
        <Grid container justifyContent="center" alignItems="center" style={styles.actionsContainer}>
          <Typography variant="caption" color="GrayText">
            You do not have an account yet ?
          </Typography>
          <Button variant="text" color="info" size="small" style={{marginLeft: 20}} onClick={gotoRegisterPage}>
            register
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
            style={{ width: 300, marginTop: 60 }}
            error={isErrors.email}
            helperText={errorsMessages.email}
          />
        </Grid>

        {/** password input */}
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ marginTop: 20 }}
        >
          <FormControl sx={{ m: 1, width: 300 }} variant="standard">
            <InputLabel size="small" htmlFor="password">
              Password
            </InputLabel>
            <Input
              name="password"
              id="password"
              size="small"
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              value={data.password}
              error={isErrors.password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
           {isErrors.password && <FormHelperText sx={{color: "red"}} id="password-helper-text">{errorsMessages.password}</FormHelperText>}
          </FormControl>
        </Grid>

        {/** forgot password action */}
        <Grid container justifyContent="center" alignItems="center" style={styles.actionsContainer}>
          <Typography variant="caption" color="GrayText">
            Forgot your password ?
          </Typography>
          <Button variant="text" color="info" size="small" style={{marginLeft: 20}} onClick={gotoForgotPasswordPage}>
            reset it
          </Button>
        </Grid>

        {/** login action */}
      {canLogin && <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ marginTop: 30 }}
        >
          <Button
            variant="contained"
            size="small"
            style={{ width: 200 }}
            onClick={handleLogin}
            color="info"
          >
            Login
          </Button>
        </Grid>}
    </Grid>
  );
}
