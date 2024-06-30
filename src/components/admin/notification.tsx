"use client";
import { Alert, Snackbar } from "@mui/material";
import React, { createContext, useState } from "react";
type NotificationProps = {
  children: React.ReactNode;
};
type HandleNotificationProps = {
  severityParams: "success" | "error" | "warning" | "info" | undefined;
  variantParams: "filled" | "outlined" | "standard" | undefined;
  textParams: string;
};
export const NotificationContext = createContext<{
  open: ({
    severityParams,
    variantParams,
    textParams,
  }: HandleNotificationProps) => void;
}>({
  open({ severityParams, variantParams, textParams }) {
    return;
  },
});
export default function NotificationProvider({ children }: NotificationProps) {
  const [severity, setSeverity] =
    useState<HandleNotificationProps["severityParams"]>(undefined);
  const [variant, setVariant] =
    useState<HandleNotificationProps["variantParams"]>(undefined);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const handleCancle = () => {
    setOpen(false);
  };
  const handleNotification = ({
    severityParams,
    variantParams,
    textParams,
  }: HandleNotificationProps) => {
    setSeverity(severityParams);
    setVariant(variantParams);
    setText(textParams);
    setOpen(true);
  };
  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleCancle}>
        <Alert
          onClose={handleCancle}
          severity={severity}
          variant={variant}
          sx={{ width: "100%" }}
        >
          {text}
        </Alert>
      </Snackbar>
      <NotificationContext.Provider value={{ open: handleNotification }}>
        {children}
      </NotificationContext.Provider>
    </>
  );
}
