import { IFormMetadataView } from '@general-vms/shared';
import { Card, CardContent, CardHeader, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './FormCard.scss';
import { useRef, useState } from 'react';
import { DateDisplay, getInterval } from '../../utility/date/intervals';

interface IProps {
  form: IFormMetadataView;
  showOptionsMenu: boolean;
  showViewableStatus: boolean;
}

export const FormCard = ({ form, showOptionsMenu, showViewableStatus }: IProps) => {
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const moreOptionsIcon = useRef<HTMLButtonElement>(null);

  const onMoreOptions = () => {
    setShowMoreOptions(!showMoreOptions);
  };

  return (
    <Card data-testid={form.formId} className='form-card-container'>
      {showOptionsMenu && (
        <div className='more-options-container'>
          <IconButton ref={moreOptionsIcon} sx={{ fontSize: 14 }} onClick={onMoreOptions}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            open={showMoreOptions}
            onClose={onMoreOptions}
            anchorEl={moreOptionsIcon.current}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            disableScrollLock={true}
          >
            <MenuItem onClick={onMoreOptions}>Edit</MenuItem>
            <MenuItem onClick={onMoreOptions}>Remove</MenuItem>
            <MenuItem onClick={onMoreOptions}>{form.viewable ? 'Disable' : 'Enable'}</MenuItem>
          </Menu>
        </div>
      )}
      <CardHeader title={form.title} />
      <CardContent>
        <Typography sx={{ fontSize: 16 }}>
          {getInterval(form.startDate, form.endDate, DateDisplay.SLASHES_MMDDYYYY)}
        </Typography>
        <Typography sx={{ fontSize: 14 }}>
          {form.description}
        </Typography>
        <Typography sx={{ fontSize: 14 }}>
          {showViewableStatus && (
            form.viewable ? 'Viewable' : 'Hidden'
          )}
        </Typography>
      </CardContent>
    </Card>
  );
};
