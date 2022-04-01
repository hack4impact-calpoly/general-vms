import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  styled,
} from '@mui/material';
import { ReactNode, ElementType, useState } from 'react';
import './GeneralDialog.scss';

const BootstrapDialog = styled(Dialog)(() => ({
  '& .MuiPaper-root': {
    minWidth: '25vw',
  },
}));

interface IIconInfo {
  sxOverride?: object;
  color: string;
  backgroundColor: string;
  IconComponent: ElementType;
}

interface IProps extends DialogProps {
  open: boolean;
  type: string;
  useTitle?: boolean;
  titleElement?: ReactNode;
  contentText: ReactNode;
  dialogActions?: ReactNode;
  allowSelfClosure?: boolean;
  closeHandler?: () => void;
  iconInfo: IIconInfo;
}

export function GeneralDialog({
  open,
  type,
  useTitle,
  titleElement,
  contentText,
  dialogActions,
  allowSelfClosure,
  closeHandler,
  iconInfo: { IconComponent, sxOverride, color, backgroundColor },
}: IProps) {
  const [actuallyOpen, setActuallyOpen] = useState(true);

  const shouldShow = allowSelfClosure ? (open && actuallyOpen) : open;

  return (
    <BootstrapDialog
      open={shouldShow}
      onClose={() => {
        setActuallyOpen(false);
        closeHandler?.();
      }}
      aria-labelledby={`${type}-dialog-title`}
      aria-describedby={`${type}-dialog-description`}
    >
      <div className='inner-dialog-container'>
        <div style={{ backgroundColor: backgroundColor || 'white' }} className='general-dialog-icon'>
          <IconComponent fontSize="large" sx={sxOverride || { color: (color || 'black') }} />
        </div>
        <div>
          {useTitle && (
            <DialogTitle id={`${type}-dialog-title`}>{titleElement}</DialogTitle>
          )}
          <DialogContent>
            <DialogContentText id={`${type}-dialog-description`}>
              {contentText}
            </DialogContentText>
          </DialogContent>
          {dialogActions}
        </div>
      </div>
    </BootstrapDialog>
  );
}
