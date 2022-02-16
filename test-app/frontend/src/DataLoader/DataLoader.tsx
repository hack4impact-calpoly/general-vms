import React, { useEffect, useState } from 'react';
import BarLoader from 'react-spinners/BarLoader';

interface Query {
  execute: () => Promise<unknown>;
  onResolve: () => void;
  onReject: () => void;
}

interface Props {
  loadingComponent?: React.ReactElement;
  query: Query;
  onceLoadedComponent: React.ReactElement;
  errorComponent: React.ReactElement;
}

const DataLoader = ({ loadingComponent, query, onceLoadedComponent, errorComponent } : Props) => {
  let initialInnerComponent : React.ReactElement = <BarLoader />;
  if (loadingComponent) {
    initialInnerComponent = loadingComponent;
  }
  const [innerComponent, setInnerComponent] = useState<React.ReactElement>(initialInnerComponent);

  useEffect(() => {
    query.execute()
      .then(
        () => {
          query.onResolve();
          setInnerComponent(onceLoadedComponent);
        },
      ).catch(
        () => {
          query.onReject();
          setInnerComponent(errorComponent);
        },
      );
  }, []);

  return innerComponent;
};

export default DataLoader;
