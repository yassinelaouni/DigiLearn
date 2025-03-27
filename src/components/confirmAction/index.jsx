import Modal from "../modal";
import { useCallback, useEffect, useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import helper from "../../helpers";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  p: 4,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  width: "40%",
};

const ConfirmContent = ({
  handleCancel,
  handleConfirm,
  withReason,
  message,
}) => {
  const [reason, setReason] = useState(null);
  const [canConfirm, setCanConfirm] = useState(message ? true : false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleReasonChange = useCallback(
    (event) => setReason(event?.target?.value),
    []
  );

  const manageConfirmHandler = () => {
    if (message) handleConfirm();
    else handleConfirm({ status: "rejected", reason });

    handleCancel();
  };

  // validate reason
  useEffect(() => {
    if (reason && !helper.validator.isReason(reason))
      setErrorMessage("It should be a valid text from 30 to 100 alphanumiric");
    else setErrorMessage(null);
  }, [reason]);

  // track submission possibility
  useEffect(() => {
    if (message || (reason && !errorMessage)) setCanConfirm(true);
    else setCanConfirm(false);
  }, [reason, errorMessage]);

  return (
    <Box sx={style}>
      <Grid container justifyContent="center">
        {withReason ? (
          <TextField
            name="reason"
            id="reason-input"
            label="Reason"
            variant="standard"
            size="small"
            onChange={handleReasonChange}
            fullWidth
            multiline
            value={reason}
            helperText={errorMessage}
            FormHelperTextProps={{ style: { color: "red" } }}
          />
        ) : (
          <Typography>{message}</Typography>
        )}
      </Grid>
      <Grid container justifyContent="space-around" style={{ marginTop: 30 }}>
        <Button
          onClick={handleCancel}
          variant="contained"
          size="small"
          color="primary"
        >
          Cancel
        </Button>
        <Button
          onClick={manageConfirmHandler}
          startIcon={<CheckIcon />}
          variant="contained"
          size="small"
          color="error"
          disabled={!canConfirm}
        >
          Confirm
        </Button>
      </Grid>
    </Box>
  );
};

export default function ConfirmAction({
  open,
  handleCancel,
  handleConfirm,
  message = null,
  withReason = false,
}) {
  return (
    <Modal
      open={open}
      handleClose={handleCancel}
      renderContent={
        <ConfirmContent
          handleCancel={handleCancel}
          handleConfirm={handleConfirm}
          message={message}
          withReason={withReason}
        />
      }
    />
  );
}