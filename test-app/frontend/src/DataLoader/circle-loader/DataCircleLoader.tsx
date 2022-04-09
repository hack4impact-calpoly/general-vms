import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import styles from './DataCircleLoader.module.scss';

export interface IDataCircleLoaderProps extends CircularProgressProps {
  caption?: React.ReactNode;
}

export function DataCircleLoader({ caption, ...circleLoaderProps }: IDataCircleLoaderProps) {
  return (
    <div className={styles.loadingContainer}>
      <CircularProgress {...circleLoaderProps} />
      {caption || 'Loading...'}
    </div>
  );
}
