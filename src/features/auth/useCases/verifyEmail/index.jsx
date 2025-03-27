import {
  Grid,
  TextField,
  Button,
  Typography,
} from "@mui/material";

import useVerifyEmail from "./service";
import styles from "./styles"

export default function VerifyEmail() {
  const {
    code,
    handleChange,
    handleVerifyEmail,
    handleResendCode,
    isError,
    errorMessage,
    canVerify
  } = useVerifyEmail();

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ marginTop: 100 }}
    >
      <Grid container justifyContent="center" alignItems="center">
        <Typography variant="caption" color="GrayText">
          A verification code already sent to your email address
        </Typography>
      </Grid>

      {/** code input */}
      <Grid container justifyContent="center" alignItems="center" style={styles.section}>
        <TextField
          name="code"
          id="code-input"
          label="Code"
          variant="standard"
          size="small"
          value={code}
          onChange={handleChange}
          style={styles.section}
          error={isError}
          helperText={errorMessage}
        />
      </Grid>

      {/** resend code action */}
      <Grid container justifyContent="center" alignItems="center" style={styles.actionsContainer}>
        <Typography variant="caption" color="GrayText">
          You did not receive the code ?
        </Typography>
        <Button variant="text" color="info" onClick={handleResendCode} size="small" style={{ marginLeft: 20 }}>
          Resend
        </Button>
      </Grid>

      {/** verify email action */}
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={styles.actionsContainer}
      >
        <Button
          variant="contained"
          size="small"
          style={{ width: 200 }}
          onClick={handleVerifyEmail}
          color="info"
        >
          Verify
        </Button>
      </Grid>
    </Grid>
  );
}
