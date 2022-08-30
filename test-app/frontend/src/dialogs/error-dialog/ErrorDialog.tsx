import { Button, DialogActions } from "@mui/material";
import { useState } from "react";
import { GeneralDialog } from "../general-dialog/GeneralDialog";
import ErrorOutline from "@mui/icons-material/ErrorOutline";

interface IProps {
  open: boolean;
  errorMessage?: string;
  errorTitle?: string;
  onClose?: () => void;
}

const DEFAULT_TITLE = "An unexpected error occurred";
export const DEFAULT_CONTENT_TEXT = "If this continues, please reach out to the site admins.";

export function ErrorDialog({ errorTitle, errorMessage, open, onClose }: IProps) {
  const [closedOverride, setClosedOverride] = useState<boolean>(false);

  const errorTitleText = errorTitle ?? DEFAULT_TITLE;
  const errorContent = errorMessage ?? DEFAULT_CONTENT_TEXT;

  return (
    <GeneralDialog
      open={open && !closedOverride}
      useTitle={true}
      type="error"
      contentText={errorContent}
      dialogActions={
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              setClosedOverride(true);
              onClose?.();
            }}
          >
            Ok
          </Button>
        </DialogActions>
      }
      titleElement={errorTitleText}
      closeHandler={onClose}
      allowSelfClosure={true}
      iconInfo={{
        IconComponent: ErrorOutline,
        color: "white",
        backgroundColor: "red",
      }}
    />
  );
}
