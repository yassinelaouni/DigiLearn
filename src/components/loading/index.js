import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
import loading from "../../store/loading";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

export default function Loading() {
  const { value } = useSelector(loading.selectors.loading);

  const [open, setOpen] = React.useState(value);
  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <CircularProgress color="warning" />
      </Box>
    </Modal>
  );
}
