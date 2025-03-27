import * as React from "react";
import Modal from "@mui/material/Modal";

export default function Loading({
  open = false,
  handleClose = () => {},
  renderContent,
}) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {renderContent}
    </Modal>
  );
}
