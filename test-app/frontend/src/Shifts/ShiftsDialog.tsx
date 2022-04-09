import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { ListItemText } from '@mui/material';
import Pickers from './ShiftsPickers';

import './ShiftsDialog.scss';

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  start: string;
  end: string;
}
function ShiftsDialog(props: SimpleDialogProps) {
  const { onClose, open, title, start, end } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{title}</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem>
          <ListItemText primary={'Start: ' + start} />
        </ListItem>
        <Pickers />
        <ListItem>
          <ListItemText primary={'End: ' + end} />
        </ListItem>
        <Pickers />
      </List>
    </Dialog>
  );
}

export default ShiftsDialog;
