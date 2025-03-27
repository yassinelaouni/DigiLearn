  import {
    Grid,
    FormControl,
    InputLabel,
    Input,
    InputAdornment,
    IconButton,
    Button,
    FormHelperText
  } from "@mui/material";
  import { Visibility, VisibilityOff } from "@mui/icons-material";
  
  import useResetPassword from "./service";
  import styles from "./styles"
  
  export default function ResetPassword() {
    const {
      showPassword,
      showPasswordConfirmation,
      data,
      handleChange,
      showPasswordHandler,
      passwordMouseDownHandler,
      handleResetPassword,
      showPassworConfirmationdHandler,
      passwordConfirmationMouseDownHandler,
      canReset,
      isErrors,
      errorsMessages
    } = useResetPassword();
  
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
      >
          {/** password input */}
          <Grid
            container
            justifyContent="center"
            alignItems="center"
          >
            <FormControl sx={{ m: 1, width: 300 }} variant="standard">
              <InputLabel size="small" htmlFor="password">
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
              <FormHelperText sx={{color: "red"}} id="password-helper-text">{errorsMessages.password}</FormHelperText>
            }
            </FormControl>
          </Grid>
          {/** password confirmation input */}
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{marginTop: 15}}
          >
            <FormControl sx={{ m: 1, width: 300 }} variant="standard">
              <InputLabel size="small" htmlFor="password">
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
              <FormHelperText sx={{color: "red"}} id="password-confirmation-helper-text">{errorsMessages.passwordConfirmation}</FormHelperText>
            }
            </FormControl>
          </Grid>
  
          {/** register action */}
          {canReset && <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={styles.actionsContainer}
          >
            <Button
              variant="contained"
              size="small"
              style={{ width: 200 }}
              onClick={handleResetPassword}
              color="info"
            >
              Reset
            </Button>
          </Grid>}
      </Grid>
    );
  }
  