import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type Props = {
  children: React.ReactNode;
  className?: string;
  open: boolean;
  onClose: () => void;
};
const BasicModal: React.FC<Props> = ({
  children,
  className,
  open,
  onClose,
}) => {
  return (
    <div className={className}>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>{children}</>
      </Modal>
    </div>
  );
};

export default BasicModal;
