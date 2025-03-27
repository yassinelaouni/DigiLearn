import {
  Grid,
  TextField,
  Button,
} from "@mui/material";

import useCheckCode from "./service";

export default function CheckCode({ gotoLastStep }) {
  const {
    code,
    handleCheck,
    handleChange,
    isError,
    errorMessage,
    canVerify
  } = useCheckCode();

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
    >
      {/** code input */}
      <Grid container justifyContent="center" alignItems="center">
        <TextField
          name="code"
          id="code-input"
          label="Code"
          variant="standard"
          size="small"
          value={code}
          onChange={handleChange}
          style={{ width: 300 }}
          error={isError}
          helperText={errorMessage}
        />
      </Grid>

      {/** check action */}
      {canVerify && <Grid
        container
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
            gotoLastStep();// to be deleted
          }}
          color="info"
        >
          Check
        </Button>
      </Grid>}
    </Grid >
  );
}
