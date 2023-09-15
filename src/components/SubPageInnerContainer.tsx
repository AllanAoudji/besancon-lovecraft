import React from 'react';
import Grid from './Grid';

type Props = {
  children?: React.ReactNode;
  className?: string;
};

function PageInnerContainer({ children, className }: Props) {
  return (
    <Grid className={`pb-12 sm:pb-24 ${className}`}>
      <div className="col-span-6 sm:col-span-10 sm:col-start-2 lg:col-span-8 lg:col-start-3">
        {children}
      </div>
    </Grid>
  );
}

export default PageInnerContainer;
