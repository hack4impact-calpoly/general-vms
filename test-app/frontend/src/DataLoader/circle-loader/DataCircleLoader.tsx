import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import './DataCircleLoader.scss';

export interface IDataCircleLoaderProps extends CircularProgressProps {
  caption?: React.ReactNode;
}

export function DataCircleLoader({ caption, ...circleLoaderProps }: IDataCircleLoaderProps) {
  return (
    <div className='circle-loader-loading-container'>
      <CircularProgress {...circleLoaderProps} />
      {caption || 'Loading...'}
    </div>
  );
}
