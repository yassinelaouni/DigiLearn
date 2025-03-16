import {
  Grid,
  TextField,
  Button,
} from "@mui/material";

import useCheckEmail from "./service";

export default function CheckEmail({ gotoSecondStep }) {
  const {
    email,
    handleCheck,
    handleChange,
    canCheck,
    isError,
    errorMessage
  } = useCheckEmail();

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
    >
      {/** email input */}
      <Grid container justifyContent="center" alignItems="center">
        <TextField
          name="email"
          id="email-input"
          label="Email"
          variant="standard"
          size="small"
          value={email}
          onChange={handleChange}
          style={{ width: 300 }}
          error={isError}
          helperText={errorMessage}
        />
      </Grid>

      {/** check action */}
      {canCheck && <Grid
        justifyContent="center"
        alignItems="center"
        style={{ marginTop: 60 }}
      >
        <Button
          variant="contained"
          size="small"
          style={{ width: 200 }}
          onClick={() => {
            handleCheck();
            gotoSecondStep();// to be deleted
          }}
          color="info"
        >
          Check
        </Button>
      </Grid>}
    </Grid >
  );
}
