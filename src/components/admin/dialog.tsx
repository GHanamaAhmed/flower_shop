"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type DialogProps = {
  children: React.ReactNode;
};
type HandleDialogProps = {
  text: string;
  title: string;
  onOk?: () => void;
  onClose?: () => void;
};
export const DialogContext = React.createContext<{
  open: ({ text, title, onOk, onClose }: HandleDialogProps) => void;
}>({
  open: () => null,
});
export default function DialogProvider({ children }: DialogProps) {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [onOk, setOnOk] = React.useState<(() => void) | undefined>(() => null);
  const [onClose, setOnClose] = React.useState<(() => void) | undefined>(
    () => null
  );
  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };
  const handleOk = () => {
    setOpen(false);
    onOk?.();
  };
  const handleDialog = ({ text, title, onOk, onClose }: HandleDialogProps) => {
    setText(text);
    setTitle(title);
    setOnOk(() => onOk);
    setOnClose(() => onClose);
    setOpen(true);
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleOk} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <DialogContext.Provider value={{ open: handleDialog }}>
        {children}
      </DialogContext.Provider>
    </>
  );
}
